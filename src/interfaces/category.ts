import { ProductI } from "./products";


export interface SubcategoryI {
  _id: string
  name: string
  slug: string
  category: string
}




export interface CategoryI {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  products?: ProductI[];
}
