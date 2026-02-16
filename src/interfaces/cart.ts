import { string } from "zod";
import { ProductI } from "./products";

export interface CartI {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: DataI;
}

export interface DataI {
  _id: string;
  cartOwner: string;
  products: CartProductI[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartProductI {
  count: number;
  _id: string;
  product: ProductI;
  price: number;
}
export interface ShippingListType {
  city: string;
  details: string;
  phone: string;
  
}
