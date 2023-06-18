import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { HelperService } from 'src/app/demo/service/helper.service';
import { User } from '../../../login/models/login.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'oms-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  @Input() isViewMode: boolean;

  @Output() handleEditForm = new EventEmitter();

  userService = inject(UserService);

  helperService = inject(HelperService);

  editForm: FormGroup;

  editRouterLink = '/user/edit';

  cancelRouterLink = '/user/detail';

  isImageError = false;

  user: Partial<User> = {
    avatar: '',
    dob: '',
    gender: '',
    fullAddress: '',
    email: '',
    fullName: '',
    phoneNumber: '',
  };

  tempImg = '';

  ngOnInit(): void {
    this.initEditForm();

    this.initUser();
  }

  initEditForm(): void {
    this.editForm = new FormGroup({
      id: new FormControl(this.user.id),
      avatar: new FormControl({ value: '', disabled: this.isViewMode }),
      fullName: new FormControl(
        { value: '', disabled: this.isViewMode },
        Validators.required
      ),
      email: new FormControl(
        { value: '', disabled: this.isViewMode },
        Validators.required
      ),
      gender: new FormControl(
        { value: '', disabled: this.isViewMode },
        Validators.required
      ),
      dob: new FormControl(
        { value: '', disabled: this.isViewMode },
        Validators.required
      ),
      phoneNumber: new FormControl(
        { value: '', disabled: this.isViewMode },
        Validators.required
      ),
      fullAddress: new FormControl(
        { value: '', disabled: this.isViewMode },
        Validators.required
      ),
    });
  }

  initUser(): void {
    this.userService.currentUser$
      .pipe(
        tap(user => {
          this.editForm.patchValue(user);

          this.user = {
            ...user,
            avatar: this.helperService.refactorImg(user.avatar!),
          };
          console.log(this.user);
        })
      )
      .subscribe();
  }

  edit(): void {
    this.handleEditForm.emit(this.editForm);
  }

  onUpload(f: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string; // Get the file content as base64 string

      this.tempImg = fileContent;

      const avaBytesArr = this.helperService.base64ToBytes(fileContent); // Convert base64 string to bytes

      const byteArr = Array.from(avaBytesArr);

      this.editForm.patchValue({
        avatar: byteArr,
      });
    };

    reader.readAsDataURL(f); // Read the file as base64 data
  }

  onImageError(e: Event): void {
    if (e) this.isImageError = true;
  }

  isBase64ImageOver1MB(base64Image: string): boolean {
    const padding =
      base64Image.charAt(base64Image.length - 2) === '='
        ? 2
        : base64Image.charAt(base64Image.length - 1) === '='
        ? 1
        : 0;
    const base64StringLength = base64Image.length;
    const fileSizeInBytes = base64StringLength * 0.75 - padding;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;

    return fileSizeInMB > 1;
  }
}
