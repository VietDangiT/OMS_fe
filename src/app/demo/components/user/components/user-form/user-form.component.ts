import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { HelperService } from 'src/app/demo/service/helper.service';
import { User } from '../../../login/models/login.models';
import { NotificationService } from '../../../share/message/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'oms-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent {
  @Output() handleEditForm = new EventEmitter();

  userService = inject(UserService);

  helperService = inject(HelperService);

  route = inject(Router);

  notificationService = inject(NotificationService);

  sanitizer = inject(DomSanitizer);

  editForm: FormGroup;

  cancelRouterLink = '/user/detail';

  user: Partial<User> = {
    avatar: '',
    email: '',
    fullAddress: '',
    fullName: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    password: '',
  };

  tempImg = '';

  destroy$ = new Subject();

  ngOnInit(): void {
    this.initEditForm();

    this.initUser();
  }

  initEditForm(): void {
    this.editForm = new FormGroup({
      id: new FormControl(this.user.id),
      avatar: new FormControl(''),
      fullName: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required] }),
      gender: new FormControl('', { validators: [Validators.required] }),
      dob: new FormControl('', { validators: [Validators.required] }),
      phoneNumber: new FormControl('', { validators: [Validators.required] }),
      fullAddress: new FormControl('', { validators: [Validators.required] }),
      userRole: new FormControl('', { validators: [Validators.required] }),
    });
  }

  initUser(): void {
    this.userService
      .getUser()
      .pipe(
        tap(res => {
          let { userDetail: user } = res;

          user = { ...user, dob: new Date(user.dob!).toLocaleDateString() };

          this.editForm.patchValue({ ...user });

          this.user = this.userService.refactorUser(user);
        })
      )
      .subscribe();
  }

  getTimeStamp(): number {
    return Date.now();
  }

  edit(): void {
    if (!this.tempImg) {
      this.editForm.patchValue({
        avatar: null,
      });
    }

    this.handleEditForm.emit(this.editForm);
  }

  onUpload(f: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string; // Get the file content as base64 string

      this.tempImg = fileContent;

      this.notificationService.successNotification(
        $localize`Uploaded new photo`
      );

      this.parseToByteArray(fileContent);
    };

    reader.readAsDataURL(f); // Read the file as base64 data
  }

  private parseToByteArray(base64: string) {
    const avaBytesArr = this.helperService.base64ToBytes(base64); // Convert base64 string to bytes

    const byteArr = Array.from(avaBytesArr);

    this.editForm.patchValue({
      avatar: byteArr,
    });
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

  ngOnDestroy(): void {
    this.destroy$.next('');

    this.destroy$.complete();
  }
}
