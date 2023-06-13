import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      avatar: new FormControl({ value: '', disabled: this.isViewMode }),
      fullName: new FormControl({ value: '', disabled: this.isViewMode }),
      email: new FormControl({ value: '', disabled: this.isViewMode }),
      gender: new FormControl({ value: '', disabled: this.isViewMode }),
      dob: new FormControl({ value: '', disabled: this.isViewMode }),
      phoneNumber: new FormControl({ value: '', disabled: this.isViewMode }),
      fullAddress: new FormControl({ value: '', disabled: this.isViewMode }),
    });
  }

  initRouterLinks(): void {
    this.editRouterLink = `/user/${this.user.id}/edit`;

    this.cancelRouterLink = `/user/${this.user.id}`;
  }

  edit(): void {
    this.handleEditForm.emit(this.editForm);
  }

  onUpload(e: Event): void {}
}
