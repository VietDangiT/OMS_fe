import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../login/models/login.models';

@Component({
  selector: 'oms-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  user: Partial<User> = {
    avatar: '',
    dob: '',
    gender: '',
    fullAddress: '',
    email: '',
    lastName: '',
    firstName: '',
    phoneNumber: '',
  };

  gender = '';

  editForm: FormGroup;

  ngOnInit(): void {
    this.editForm = new FormGroup({
      avatar: new FormControl(''),
      fullName: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl(''),
      dob: new FormControl(''),
      phoneNumber: new FormControl(''),
      fullAddress: new FormControl(''),
    });
  }

  edit(): void {}
}
