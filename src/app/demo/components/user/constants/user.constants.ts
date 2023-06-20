import { gql } from 'apollo-angular';

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
    $dob: String!
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
