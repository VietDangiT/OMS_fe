export interface MenuElement {
  name: string;
  path: string;
  icon: string;
  submenu: {
    title: string;
    items: MenuElementItem[];
  };
}

export interface MenuElementItem {
  name: string;
  content: string;
  path: string;
  icon: string;
  param?: object;
  value?: number;
}
