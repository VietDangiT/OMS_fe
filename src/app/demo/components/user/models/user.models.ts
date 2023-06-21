import { gql } from "apollo-angular";
import { PagingParams } from "src/app/demo/interface/global.model";
import { BaseChart } from "../../dashboard/interfaces/dashboard.models";

export interface User {
  id?: number;
  fullName?: string,
  phoneNumber?: string,
  DOB?: string,
  gender?: string,
  email?: string,
  userRole?: string,
  fullAddress?: string,
  userStatus?: string,
  facebook?: string,
  instagram?: string,
  userName?: string,
  userPassword?: string,
  avatar?: string,
}

export interface UserParams extends PagingParams {
  userRole: string;
}

export interface UserApiResponse {
  users: {
    data: User[];
    first: number;
    page: number;
    pageCount: number;
    rows: number;
    totalRecord: number;
  };
}
export interface UserStatusApiResponse {
  userStatus: BaseChart[];
}

export interface UserRoleApiResponse {
  userRole: BaseChart[];
}

export const GET_USERS = gql`
  query GetUsers(
    $role: String
    $keyword: String
    $status: String
    $limit: Int!
    $page: Int!
  ) {
    users(
      role: $role
      keyword: $keyword
      status: $status
      limit: $limit
      page: $page
    ) {
      page
      first
      rows
      pageCount
      totalRecord
      data{
        avatar
        fullName
        email
        phoneNumber
        fullAddress
        userRole
        userStatus
      }
    }
  }
`;

export const GET_USER_STATUS = gql`
  query GetUserStatus($role: String!) {
    userStatus(role: $role) {
      displayText
      value
    }
  }
`;
