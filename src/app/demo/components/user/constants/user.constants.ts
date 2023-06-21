import { MenuItem } from "primeng/api";
import { TableHeader } from "src/app/demo/interface/global.model";
import { gql } from 'apollo-angular';

export const userHeaderTable: TableHeader[] = [
  { field: 'avatar', col: 'Avatar' },
  { field: 'fullName', col: 'Full Name' },
  { field: 'email', col: 'Email' },
  { field: 'phoneNumber', col: 'Phone Number' },
  { field: 'fullAddress', col: 'Address' },
  { field: 'userRole', col: 'Role' },
  { field: 'userStatus', col: 'Status' },
  { field: 'actions', col: 'Actions' },
];

export const userLabelItems: MenuItem[] = [
  { label: 'All', id: '', badge: '0' ,},
  { label: 'Active', id: 'Active', badge: '0' },
  { label: 'Inactive', id: 'Inactive', badge: '0' },
];

export const GET_USER_DETAIL = gql`
  query GetUserDetail($id: Int!) {
    userDetail(id: $id) {
      id
      fullName
      avatar
      phoneNumber
      dob
      gender
      email
      fullAddress
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $currentPassword: String!
    $id: Int!
    $newPassword: String!
  ) {
    changeUserPassword(
      currentPassword: $currentPassword
      id: $id
      newPassword: $newPassword
    )
  }
`;

export const EDIT_USER = gql`
  mutation EditUserProfile(
    $avatar: [Byte!]!
    $dob: DateTime!
    $email: String!
    $fullAddress: String!
    $fullName: String!
    $gender: String!
    $phoneNumber: String!
    $id: Int!
  ) {
    editUserProfile(
      userInfo: {
        avatar: $avatar
        dob: $dob
        email: $email
        fullAddress: $fullAddress
        fullName: $fullName
        gender: $gender
        phoneNumber: $phoneNumber
        id: $id
      }
    ) {
      avatar
      dob
      email
      fullName
      fullAddress
      phoneNumber
      id
    }
  }
`;
