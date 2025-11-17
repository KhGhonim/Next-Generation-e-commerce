import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

const API_URL = import.meta.env.VITE_APP_API_URL;

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
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  uniqueItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
};

// Helper function to generate unique cart item ID
const generateCartItemId = (id: string, size?: string, color?: string): string => {
  return `${id}-${size || 'no-size'}-${color || 'no-color'}`;
};

// Helper function to recalculate cart totals
const recalculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const uniqueItems = items.length;
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalItems, uniqueItems, totalPrice };
};

// Thunk to add item to cart with backend sync
export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (item: Omit<CartItem, 'cartItemId'>, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    // If not authenticated, return error (navigation handled by button component)
    if (!isAuthenticated || !user) {
      return rejectWithValue('User not authenticated');
    }

    try {
      // Save to backend
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...item,
          userId: user._id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add item to cart');
      }

      const result = await response.json();
      // Backend should return the updated cart items
      return result.cartItems || result.items || result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to remove item from cart with backend sync
export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (cartItemId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    if (!isAuthenticated || !user) {
      return rejectWithValue('User not authenticated');
    }

    try {
      const response = await fetch(`${API_URL}/api/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove item from cart');
      }

      const result = await response.json();
      // Backend should return the updated cart items
      return result.cartItems || result.items || result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove item from cart';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to update quantity with backend sync
export const updateQuantityAsync = createAsyncThunk(
  'cart/updateQuantityAsync',
  async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    if (!isAuthenticated || !user) {
      return rejectWithValue('User not authenticated');
    }

    try {
      const response = await fetch(`${API_URL}/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          quantity,
          userId: user._id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update quantity');
      }

      const result = await response.json();
      // Backend should return the updated cart items
      return result.cartItems || result.items || result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update quantity';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to clear cart with backend sync
export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    if (!isAuthenticated || !user) {
      return rejectWithValue('User not authenticated');
    }

    try {
      const response = await fetch(`${API_URL}/api/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user._id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to clear cart');
      }

      return { items: [] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to fetch cart from backend
export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCartAsync',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    if (!isAuthenticated || !user) {
      return rejectWithValue('User not authenticated');
    }

    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch cart');
      }

      const result = await response.json();
      // Backend should return the cart items
      return result.cartItems || result.items || result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cart';
      return rejectWithValue(errorMessage);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add to cart
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        
        // Update items from backend response
        if (Array.isArray(action.payload)) {
          state.items = action.payload.map((item: Partial<CartItem>) => ({
            ...item,
            cartItemId: item.cartItemId || generateCartItemId(item.id || '', item.size, item.color),
          })) as CartItem[];
        } else {
          // If backend returns single item, add/update it
          const newItem = action.payload as Partial<CartItem>;
          if (newItem.id) {
            const cartItemId = generateCartItemId(newItem.id, newItem.size, newItem.color);
            const existingItem = state.items.find(item => item.cartItemId === cartItemId);
            
            if (existingItem) {
              existingItem.quantity += newItem.quantity || 1;
            } else {
              state.items.push({
                id: newItem.id,
                name: newItem.name || '',
                price: newItem.price || 0,
                quantity: newItem.quantity || 1,
                image: newItem.image || '',
                size: newItem.size,
                color: newItem.color,
                cartItemId,
              });
            }
          }
        }
        
        // Recalculate totals
        const totals = recalculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.uniqueItems = totals.uniqueItems;
        state.totalPrice = totals.totalPrice;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Remove from cart
    builder
      .addCase(removeFromCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        
        // Update items from backend response
        if (Array.isArray(action.payload)) {
          state.items = action.payload.map((item: Partial<CartItem>) => ({
            ...item,
            cartItemId: item.cartItemId || generateCartItemId(item.id || '', item.size, item.color),
          })) as CartItem[];
        } else {
          // If backend confirms removal, filter out the item
          // This is a fallback if backend doesn't return updated items
          // The cartItemId should be passed in the action payload
          state.items = state.items.filter(item => item.cartItemId !== action.meta.arg);
        }
        
        // Recalculate totals
        const totals = recalculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.uniqueItems = totals.uniqueItems;
        state.totalPrice = totals.totalPrice;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update quantity
    builder
      .addCase(updateQuantityAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        
        // Update items from backend response
        if (Array.isArray(action.payload)) {
          state.items = action.payload.map((item: Partial<CartItem>) => ({
            ...item,
            cartItemId: item.cartItemId || generateCartItemId(item.id || '', item.size, item.color),
          })) as CartItem[];
        } else {
          // If backend returns single item, update it
          const updatedItem = action.payload as Partial<CartItem>;
          const item = state.items.find(item => item.cartItemId === action.meta.arg.cartItemId);
          if (item) {
            item.quantity = updatedItem.quantity || action.meta.arg.quantity;
          }
        }
        
        // Recalculate totals
        const totals = recalculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.uniqueItems = totals.uniqueItems;
        state.totalPrice = totals.totalPrice;
      })
      .addCase(updateQuantityAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Clear cart
    builder
      .addCase(clearCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.items = [];
        state.totalItems = 0;
        state.uniqueItems = 0;
        state.totalPrice = 0;
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch cart
    builder
      .addCase(fetchCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        
        // Update items from backend response
        if (Array.isArray(action.payload)) {
          state.items = action.payload.map((item: Partial<CartItem>) => ({
            ...item,
            cartItemId: item.cartItemId || generateCartItemId(item.id || '', item.size, item.color),
          })) as CartItem[];
        }
        
        // Recalculate totals
        const totals = recalculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.uniqueItems = totals.uniqueItems;
        state.totalPrice = totals.totalPrice;
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
