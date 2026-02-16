import { CategoryI, SubcategoryI } from "./category";
import { ProductI } from "./products";

export interface BrandI {
  _id: string
  name: string
  slug: string
  image: string
  products?: ProductI[];
}

export interface ProductByBrandType {
  sold: number
  images: string[]
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  availableColors: any[]
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}
export interface BrandByIDType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
