export interface UserInterface {
    id: number;
    username: string;
    email: string;
    role: string;
    wishlist: WishlistInterface; 
    orders: OrderInterface[]; 
    cart: CartInterface | null; 
    firstName: string,
    lastName: string,
    phoneNo: string
  }
  

export interface WishlistInterface {
    id: number,
    user: UserInterface,
    items: WishlistItemsInterface[]
}

export interface WishlistItemsInterface {
    id: number,
    productId: number,
    productName: string,
}

export interface OrderInterface {
    id: number,
    user: UserInterface,
    items: OrderItemInterface[],
    status: string,
    pointsEarned: number,
    orderDate: Date,
    addressLine: string,
    city: string,
    state: string,
    zipCode: string
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
    categoryName: string,
    colorName: string,
    imageUrl: string,
    stock: number,
    sales: number
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

