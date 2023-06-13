export interface User {
  id: number;
  fullName: string;
  username: string;
  password: string;
  role: Role;
  token?: string;
  avatar: string;
  dob: string;
  email: string;
  fullAddress: string;
  gender: string;
  phoneNumber: string;
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
