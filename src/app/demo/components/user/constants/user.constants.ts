import { MenuItem } from "primeng/api";
import { TableHeader } from "src/app/demo/interface/global.model";

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