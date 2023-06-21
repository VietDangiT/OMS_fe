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

  editForm: FormGroup;

  editRouterLink = '';

  cancelRouterLink = '';

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

  ngOnInit(): void {
    const id = localStorage.getItem('userId');

    this.initEditForm();

    this.initRouterLinks();

    this.getUser(Number(id));
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

  getUser(id: number): void {
    this.userService
      .getUserDetail(Number(id))
      .pipe(
        tap(res => {
          let { userDetail: user } = res;

          user = this.userService.refactorUser(user);

          this.user = user;

          this.editForm.patchValue(this.user);
        })
      )
      .subscribe();
  }

  initRouterLinks(): void {
    this.editRouterLink = `/user/edit`;

    this.cancelRouterLink = `/user/detail`;
  }

  edit(): void {
    this.handleEditForm.emit(this.editForm);
  }

  onUpload(f: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string; // Get the file content as base64 string

      const avaBytesArr = this.base64ToBytes(fileContent); // Convert base64 string to bytes

      const byteArr = Array.from(avaBytesArr);

      this.editForm.patchValue({
        avatar: byteArr,
      });
    };

    reader.readAsDataURL(f); // Read the file as base64 data
  }

  base64ToBytes(base64String: string): Uint8Array {
    const base64WithoutPrefix = base64String.replace(
      /^data:image\/\w+;base64,/,
      ''
    );
    const decodedData = atob(base64WithoutPrefix);
    const outputArray = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; ++i) {
      outputArray[i] = decodedData.charCodeAt(i);
    }

    return outputArray;
  }

  onImageError(e: Event): void {
    if (e) this.isImageError = true;
  }
}
