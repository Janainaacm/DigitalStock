
export interface UserInterface {
    id: number,
    email: string,
    username: string,
    password: string,
    userRole: string,
    wishlist: WishlistInterface[],
    orders: OrderInterface[]
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

