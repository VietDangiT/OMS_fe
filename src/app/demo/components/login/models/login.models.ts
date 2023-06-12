export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: Role;
  token?: string;
}

export enum Role {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  USER = 'User',
}

export interface SignIn {
  UserName: any;
  UserPassword: any;
}
