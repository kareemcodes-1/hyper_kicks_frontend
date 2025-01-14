
export type Collection = {
    _id: number;
    name: string,
    description: string,
    image: string,
}

export type Product = {
    _id: number;
    collectionId: Collection;
    name: string,
    description: string,
    price: number,
    images: string[],
    sizes: string[],
    inStock: boolean;
    createdAt: Date;
}

export type Order = {
    _id: string;
    userId: User;
    products: {
        productId: Product;
        quantity: number;
    }[];    
    totalAmount: number;
    // createdAt: string;
};

export type WishListItem = {
    userId: User;
    productId: Product;
}

export type User = {
    _id: number,
    name: string,
    email: string,
    avatar: string
    password: string;
}

export type CartItem = {
    product: Product;
    quantity: number;
}