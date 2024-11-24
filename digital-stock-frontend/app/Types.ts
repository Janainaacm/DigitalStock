export interface UserInterface {
    id: string;
    username: string;
    email: string;
    roles: string[];
    userWishlist: WishlistInterface[] | null; 
    userOrders: OrderInterface[] | null; 
    cart: CartInterface | null; 
  }
  

export interface WishlistInterface {
    id: string,
    user: UserInterface,
    product: ProductInterface,
    addedAt: EpochTimeStamp
}

export interface OrderInterface {
    id: string,
    user: UserInterface,
    items: OrderItemInterface[],
    status: string,
    pointsEarned: number,
    orderDate: Date
}

export interface OrderItemInterface {
    id: string,
    product: ProductInterface,
    quantity: number
}

export interface ProductInterface {
    id: string,
    name: string,
    description: string,
    price: number,
    categoryName: string,
    colorName: string,
    imageUrl: string,
    stock: number,
}

export interface CategoryInterface {
    id: string,
    name: string,
    products: ProductInterface[]
}


export interface CartInterface {
    id: string,
    user: UserInterface,
    cartItems: CartItemInterface[]
}

export interface CartItemInterface {
    id: string, 
    cart: CartInterface,
    product: ProductInterface,
    quantity: number
}

