import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_USERS, GET_USER_STATUS, UserApiResponse, UserParams, UserRoleApiResponse, UserStatusApiResponse } from '../components/user/models/user.models';

const GET_USER_ROLE = gql`
  query {
    userRole {
      displayText
      value
    }
  }
`;

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

  getUserStatus(role: string): Observable<UserStatusApiResponse> {
    return this.apollo
      .watchQuery<UserStatusApiResponse>({
        query: GET_USER_STATUS,
        variables: {
          role: role,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getUserRole(): Observable<UserRoleApiResponse> {
    return this.apollo
      .watchQuery<UserRoleApiResponse>({
        query: GET_USER_ROLE,
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
