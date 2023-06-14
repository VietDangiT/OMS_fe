import { Injectable, inject } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { User } from '../../login/models/login.models';
import {
  CHANGE_PASSWORD,
  EDIT_USER,
  GET_USER_DETAIL,
} from '../constants/user.constants';
import {
  ChangePasswordApiResponse,
  EditUserApiResponse,
  UserDetailApiResponse,
} from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apollo = inject(Apollo);

  refactorUser(user: Partial<User>): Partial<User> {
    return {
      ...user,
      dob: new Date(user.dob!).toLocaleDateString(),
    };
  }

  getUserDetail(id: number): Observable<UserDetailApiResponse> {
    return this.apollo
      .watchQuery<UserDetailApiResponse>({
        query: GET_USER_DETAIL,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  changePassword(
    currentPassword: string,
    id: number,
    newPassword: string
  ): Observable<MutationResult<ChangePasswordApiResponse>> {
    return this.apollo.mutate<ChangePasswordApiResponse>({
      mutation: CHANGE_PASSWORD,
      variables: {
        currentPassword,
        id,
        newPassword,
      },
    });
  }

  editUser(
    userInfo: Partial<User>
  ): Observable<MutationResult<EditUserApiResponse>> {
    const {
      avatar,
      dob,
      email,
      fullAddress,
      fullName,
      gender,
      phoneNumber,
      id,
    } = userInfo;

    return this.apollo.mutate<EditUserApiResponse>({
      mutation: EDIT_USER,
      variables: {
        avatar,
        dob,
        email,
        fullAddress,
        fullName,
        gender,
        phoneNumber,
        id,
      },
    });
  }
}
