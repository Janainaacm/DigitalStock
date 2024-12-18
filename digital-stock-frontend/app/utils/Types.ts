export interface UserInterface {
  id: number;
  username: string;
  email: string;
  role: string;
  wishlist: WishlistInterface;
  orders: OrderInterface[];
  cart: CartInterface | null;
  firstName: string;
  lastName: string;
  phoneNo: string;
  address: AddressInterface;
}

export interface WishlistInterface {
  id: number;
  user: UserInterface;
  items: WishlistItemsInterface[];
}

export interface AddressInterface {
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface WishlistItemsInterface {
  id: number;
  product: ProductInterface;
}

export interface OrderInterface {
  id: number;
  user: UserInterface;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  orderItems: OrderItemInterface[];
  status: string;
  orderDate: string;
  address: AddressInterface;
  subtotal: number;
}

export interface OrderItemInterface {
  id: number;
  product: ProductInterface;
  quantity: number;
}

export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  colorName: string;
  imageUrl: string;
  stock: number;
  sales: number;
  isInWishlist?: boolean;
}

export interface CategoryInterface {
  id: number;
  name: string;
  products: ProductInterface[];
}

export interface CartInterface {
  id: number;
  user: UserInterface;
  items: CartItemInterface[];
}

export interface CartItemInterface {
  id: number;
  cart: CartInterface;
  product: ProductInterface;
  quantity: number;
}


  