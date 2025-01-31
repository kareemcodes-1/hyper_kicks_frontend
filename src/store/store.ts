import {create} from "zustand";

import { CartItem, Collection, Product, User, WishListItem, Order } from "../types/types";

interface State {
    cart: CartItem[];
    originalProducts: Product[];
    orders: Order[];
    wishlists: WishListItem[];
    totalAmount: number;
    openCartModal: boolean;
    setOpenCartModal: (value: boolean) => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;
    addToCart: (data: CartItem) => void;
    collections: Collection[];
    products: Product[];
    filteredProducts: Product[];
    userInfo: User | null;
    setCollections: (collections: Collection[]) => void;
    setProducts: (products: Product[]) => void;
    setOrders: (data: Order[]) => void;
    setWishLists: (data: WishListItem[]) => void;
    setUserInfo: (data: User) => void;
    logout: () => void;
    handleSort: (value: string) => void;
    handleSearch: (value: string) => void;
    deleteCartItem: (id: number) => void;
    deleteAllCartItems: () => void;
    handleFilterByPrice: (value: number) => void;
    filterInStock: boolean;
    setFilterInStock: (value: boolean) => void;
    resetFilter: () => void;
}

const storedUserInfo = localStorage.getItem('userInfo');
const storedCartInfo = localStorage.getItem('cartInfo');
const storedTotalAmount = localStorage.getItem('totalAmount');


export const useStore = create<State>((set) => ({
    collections: [],
    originalProducts: [],
    orders: [],
    filterInStock: true,
    wishlists: [],
    products: [],
    filteredProducts: [],
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
    cart: storedCartInfo ? JSON.parse(storedCartInfo) : [],
    totalAmount: storedTotalAmount ? JSON.parse(storedTotalAmount) : 0,
    openCartModal: false,
    setOpenCartModal(value) {
        return set(() => ({
            openCartModal: value,
        }))
    },
    incrementQuantity(id) {
        return set((state) => {
            const updatedCart = state.cart.map((item) => 
            item.product._id === id ? 
            {...item, quantity: item.quantity + 1} : item);
            let totalAmount = 0;
            for (const item of updatedCart) {
                totalAmount += item.product.price * item.quantity;
            }
            localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
            localStorage.setItem('cartInfo', JSON.stringify(updatedCart));
            return {
                cart: updatedCart,
                totalAmount
            }
        });
    },
    decrementQuantity(id) {
        return set((state) => {
            const updatedCart = state.cart.map((item) => 
            item.product._id === id ? 
            {...item, quantity: item.quantity - 1} : item);
            let totalAmount = 0;
            for (const item of updatedCart) {
                totalAmount -= item.product.price * item.quantity;
            }
            localStorage.setItem('totalAmount', JSON.stringify(Math.abs(totalAmount)));
            localStorage.setItem('cartInfo', JSON.stringify(updatedCart));
            return {
                cart: updatedCart,
                totalAmount: Math.abs(totalAmount)
            }
        });
    },

    addToCart(data) {
        return set((state) => {
            const updatedCart = [...state.cart, data];
            const totalAmount = data.product.price + state.totalAmount * data.quantity;
            localStorage.setItem('cartInfo', JSON.stringify(updatedCart));
            localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
            return {
                cart: updatedCart,
                totalAmount
            }
        })
    },

    deleteCartItem(id) {(
        set((state) => {
            const updatedCart = state.cart.filter((item) => item.product._id !== id);
            let totalAmount = 0;
            for (const item of updatedCart) {
                totalAmount += item.product.price * item.quantity;
            }
            localStorage.setItem('cartInfo', JSON.stringify(updatedCart));
            localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
            return {
                ...state,
                cart: updatedCart,
                totalAmount
            }
        })
    )},

    deleteAllCartItems() {(
        set(() => {
            localStorage.removeItem('cartInfo');
            return {
                cart: [],
            }
        })
    )},

    setCollections: (collections) => {
        return set((state) => ({
            collections: state.collections = collections,
        }))
    },
    setOrders: (data) => {
        return set(() => ({
            orders: [...data],
        }));
    },
    setProducts(products) {
        return set(() => ({
            products: [...products],
            originalProducts: [...products],
        }))
    },
    setWishLists(data) {
        return set(() => ({
            wishlists: [...data],
        }))
    },
    setUserInfo(data) {
        return set((state) => {
            localStorage.setItem('userInfo', JSON.stringify(data));
            return {
                userInfo: state.userInfo = data
            }
        });
    },
    logout() {
        return set((state) => {
            localStorage.removeItem('userInfo');
            return {
                userInfo: state.userInfo = null,
            }
        })
    },

    handleSort(value) {
        return set((state) => {
            let filteredProducts = [...state.products];
            if(value === 'low_to_high'){
                filteredProducts.sort((a, b) => a.price - b.price);
            }else if(value === 'high_to_low'){
                filteredProducts.sort((a, b) => b.price - a.price);
            }else if(value === 'latest'){
                filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }else if(value === 'reset'){
                filteredProducts = state.products;
            }
            return {
                products: filteredProducts
            }
        })
    },

    handleFilterByPrice(value) {
        return set((state) => {
            let filteredProducts = [...state.originalProducts];
            filteredProducts = filteredProducts.filter((product) => product.price <= value);
            return {
                products: filteredProducts
            }
        })
    },

    resetFilter(){
        return set(state => ({
            products: [...state.originalProducts],
        }))
    },

    handleSearch(value) {
        return set(state => {
            const filteredProducts = state.products.filter((product) => product.name.toLowerCase() === value.toLowerCase());
            return {
                filteredProducts: [...filteredProducts],
            }
        })
    },

    setFilterInStock(value) {
        return set((state) => {
            const filteredProducts = state.originalProducts.filter((product) => product.inStock === value);
            return {
                filterInStock: value,
                products: filteredProducts,
            };
        });
    },
}));

