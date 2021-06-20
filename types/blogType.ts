import { AdminUserInterface } from "./adminUserType";
import { CategoryInterface } from "./categoryType";

export interface BlogCardBackgroundInterface {
  name: string;
  url: string;
}

export interface BlogCardInterface {
  blog_title: string;
  blog_detail?: string;

  admin_user: AdminUserInterface;
  blog_backgroundimage: BlogCardBackgroundInterface;
  categories: CategoryInterface[];
  published_at: string;
}
