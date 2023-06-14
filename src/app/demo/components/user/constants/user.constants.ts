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
