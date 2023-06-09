import { gql } from "apollo-angular";
import { PagingParams } from "src/app/demo/interface/global.model";

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

export const GET_USERS = gql`
  query GetOrders(
    $role: string
    $keyword: string
    $status: string
    $limit: int
    $page: int
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
