export interface UserInterface {
    id: number;
    username: string;
    email: string;
    roles: string[];
    userWishlist: WishlistInterface[] | null; 
    userOrders: OrderInterface[] | null; 
    cart: CartInterface | null; 
  }
  

export interface WishlistInterface {
    id: number,
    user: UserInterface,
    product: ProductInterface,
    addedAt: EpochTimeStamp
}

export interface OrderInterface {
    id: number,
    user: UserInterface,
    items: OrderItemInterface[],
    status: string,
    pointsEarned: number,
    orderDate: Date
}

export interface OrderItemInterface {
    id: number,
    product: ProductInterface,
    quantity: number
}

export interface ProductInterface {
    id: number,
    name: string,
    description: string,
    price: number,
    category: CategoryInterface,
    colorName: string,
    imageUrl: string,
    stock: number,
}

export interface CategoryInterface {
    id: number,
    name: string,
    products: ProductInterface[]
}


export interface CartInterface {
    id: number,
    user: UserInterface,
    cartItems: CartItemInterface[]
}

export interface CartItemInterface {
    id: number, 
    cart: CartInterface,
    product: ProductInterface,
    quantity: number
}

