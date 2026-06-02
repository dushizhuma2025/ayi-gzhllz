export interface PageData {
  urlPath: string;
  title: string;
  description: string;
  html: string;
  created?: string;
  tags?: string[];
}

export interface SidebarItem {
  title: string;
  urlPath?: string;
  items?: SidebarItem[];
}
