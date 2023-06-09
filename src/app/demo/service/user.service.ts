import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { GET_USERS, UserApiResponse, UserParams } from '../components/user/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly apollo: Apollo) {}

  getUsers(usersParams: UserParams): Observable<UserApiResponse> {
    const { userRole, fromDate, keyword, limit, page, status, toDate } =
      usersParams;

    return this.apollo
      .watchQuery<UserApiResponse>({
        query: GET_USERS,
        variables: {
          userRole,
          fromDate,
          toDate,
          keyword,
          status,
          limit,
          page,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
