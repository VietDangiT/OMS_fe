import { User } from '../../login/models/login.models';

export interface UserDetailApiResponse {
  userDetail: Partial<User>;
}
