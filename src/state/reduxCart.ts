import { createSlice } from "@reduxjs/toolkit";
export interface ProductData {
    _id: string;
    productName: string;
    price: number;
    image: string;
    description: string;
}
export interface CartItem {
    product: ProductData
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};
const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            const { product } = action.payload;

            // Check if the product already exists in the cart
            const existingItem = state.cartItems.find(item => item.product._id === product._id);

            if (existingItem) {
                // Increment the quantity of the existing product
                const updatedItems = state.cartItems.map(item => {
                    if (item.product._id === product._id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                return { ...state, cartItems: updatedItems };
            } else {
                // Add the new product to the cart with a quantity of 1
                return { ...state, cartItems: [...state.cartItems, { product, quantity: 1 }] };
            }
        },
        removeItem: (state, action) => {
            const { _id } = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.product._id !== _id);
        },
        updateQuantityInCart: (state, action) => {
            const { product, quantity } = action.payload;
            const foundIndex = state.cartItems.find((item) => item.product._id === product._id);
            if (foundIndex) {
                foundIndex.quantity = quantity;
            }
            else {
                state.cartItems.push({ product, quantity });
            }
            if (quantity == 0) {
                state.cartItems = state.cartItems.filter((item) => item.product._id !== product._id);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
});

export const { addItem, removeItem, updateQuantityInCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
