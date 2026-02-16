import { ProductI } from "./products"

export interface PaymentTypeI {
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: string
  cartItems: CartItemI[]
  shippingAddress: ShippingAddressI
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface CartItemI {
  count: number
  _id: string
  product: ProductI
  price: number
}

export interface ShippingAddressI {
  details: string
  phone: string
  city: string
}
