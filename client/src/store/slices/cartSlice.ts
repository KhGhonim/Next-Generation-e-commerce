import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  // Unique identifier for cart operations
  cartItemId: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number; // Total quantity of all items
  uniqueItems: number; // Number of unique items (different cartItemIds)
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  uniqueItems: 0,
  totalPrice: 0,
};

// Helper function to generate unique cart item ID
const generateCartItemId = (id: string, size?: string, color?: string): string => {
  return `${id}-${size || 'no-size'}-${color || 'no-color'}`;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'cartItemId'>>) => {
      const cartItemId = generateCartItemId(action.payload.id, action.payload.size, action.payload.color);
      
      const existingItem = state.items.find(item => item.cartItemId === cartItemId);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          cartItemId,
        });
      }

      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.uniqueItems = state.items.length;
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.cartItemId !== action.payload);
      
      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.uniqueItems = state.items.length;
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action: PayloadAction<{ cartItemId: string; quantity: number }>) => {
      const item = state.items.find(item => item.cartItemId === action.payload.cartItemId);
      if (item) {
        item.quantity = action.payload.quantity;
        
        // Recalculate totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.uniqueItems = state.items.length;
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.uniqueItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
