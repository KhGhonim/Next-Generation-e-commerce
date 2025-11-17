import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  description: string;
  inStock: boolean;
  addedAt: string; // ISO date string
}

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
  isLoading: false,
  error: null,
};



const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Omit<WishlistItem, 'addedAt'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        state.items.push({
          ...action.payload,
          addedAt: new Date().toISOString(),
        });
        state.totalItems = state.items.length;
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.length;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
