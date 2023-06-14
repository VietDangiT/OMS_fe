import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../login/models/login.models';

@Component({
  selector: 'oms-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Input() isViewMode: boolean;

  @Input() user: Partial<User>;

  @Output() handleEditForm = new EventEmitter();

  editForm: FormGroup;

  editRouterLink = '';

  cancelRouterLink = '';

  ngOnInit(): void {
    this.initEditForm();

    this.initRouterLinks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']?.currentValue) {
      this.editForm?.patchValue(changes['user'].currentValue);
    }
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
}
