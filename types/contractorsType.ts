import { CategoryInterface } from "./categoryType";
import { ImageInterface } from "./imageType";
import { UserInterface } from "./userType";

export interface ContractorsInterface {
  contractor_name: string;
  contractor_description: string;
  contractor_address: string;
  contractor_website: string;
  contractor_telephone: string;
  contractor_facebook: string;
  contractor_line: string;
  contractor_lat: number;
  contractor_lng: number;
  published_at: string;
  user: UserInterface;
  contractor_images: ImageInterface[];
  categories: CategoryInterface[];
}
