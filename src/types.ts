export interface PageData {
  path: string;
  title: string;
  description: string;
  html: string;
  created?: string;
  tags?: string[];
}

export interface SidebarItem {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: SidebarItem[];
}
