import { ImageInterface } from "./imageType";

export interface CategoryInterface {
  id?: number;
  category_name: string;
  category_description?: string;
  category_svg: string;
  category_background?: ImageInterface;
}
