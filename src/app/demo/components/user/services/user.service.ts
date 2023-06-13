import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { User } from '../../login/models/login.models';
import { GET_USER_DETAIL } from '../constants/user.constants';
import { UserDetailApiResponse } from '../models/user.models';

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
}
