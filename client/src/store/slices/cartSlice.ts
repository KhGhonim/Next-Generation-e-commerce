import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const API_URL = import.meta.env.VITE_APP_API_URL;
const GUEST_CART_KEY = 'vexo_guest_cart';

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

// LocalStorage helpers for guest cart
const saveGuestCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save guest cart to localStorage:', error);
  }
};

const loadGuestCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(GUEST_CART_KEY);
    if (stored) {
      return JSON.parse(stored) as CartItem[];
    }
  } catch (error) {
    console.error('Failed to load guest cart from localStorage:', error);
  }
  return [];
};

const clearGuestCartFromStorage = () => {
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch (error) {
    console.error('Failed to clear guest cart from localStorage:', error);
  }
};

// Initialize state with guest cart from localStorage
const guestCartItems = loadGuestCartFromStorage();
const initialTotals = recalculateTotals(guestCartItems);

const initialState: CartState = {
  items: guestCartItems,
  totalItems: initialTotals.totalItems,
  uniqueItems: initialTotals.uniqueItems,
  totalPrice: initialTotals.totalPrice,
  isLoading: false,
  error: null,
};

// Thunk to sync guest cart to database when user logs in
export const syncGuestCartAsync = createAsyncThunk(
  'cart/syncGuestCartAsync',
  async (guestItems: CartItem[], { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    if (!isAuthenticated || !user) {
      return rejectWithValue('User not authenticated');
    }

    try {
      // Add each guest item to the database cart
      const syncPromises = guestItems.map((item) =>
        fetch(`${API_URL}/api/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            size: item.size,
            color: item.color,
            userId: user._id,
          }),
        })
      );

      await Promise.all(syncPromises);

      // Fetch the updated cart from database
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart after sync');
      }

      const result = await response.json();
      return result.cartItems || result.items || [];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sync guest cart';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to add item to cart (handles both guest and authenticated)
export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (item: Omit<CartItem, 'cartItemId'>, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    const cartItemId = generateCartItemId(item.id, item.size, item.color);
    const cartItem: CartItem = {
      ...item,
      cartItemId,
    };

    // Guest user: add to local state (will be handled by reducer)
    if (!isAuthenticated || !user) {
      return { type: 'guest', item: cartItem };
    }

    // Authenticated user: save to backend
    try {
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
      return { type: 'authenticated', items: result.cartItems || result.items || result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to remove item from cart (handles both guest and authenticated)
export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (cartItemId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    // Guest user: remove from local state (will be handled by reducer)
    if (!isAuthenticated || !user) {
      return { type: 'guest', cartItemId };
    }

    // Authenticated user: remove from backend
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
      return { type: 'authenticated', items: result.cartItems || result.items || result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove item from cart';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to update quantity (handles both guest and authenticated)
export const updateQuantityAsync = createAsyncThunk(
  'cart/updateQuantityAsync',
  async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    // Guest user: update local state (will be handled by reducer)
    if (!isAuthenticated || !user) {
      return { type: 'guest', cartItemId, quantity };
    }

    // Authenticated user: update in backend
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
      return { type: 'authenticated', items: result.cartItems || result.items || result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update quantity';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to clear cart (handles both guest and authenticated)
export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { isAuthenticated, user } = state.user;

    // Guest user: clear local state (will be handled by reducer)
    if (!isAuthenticated || !user) {
      return { type: 'guest' };
    }

    // Authenticated user: clear from backend
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

      return { type: 'authenticated', items: [] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to fetch cart from backend (only for authenticated users)
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
      return result.cartItems || result.items || [];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cart';
      return rejectWithValue(errorMessage);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Guest cart operations
    addGuestItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.cartItemId === newItem.cartItemId);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      const totals = recalculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.uniqueItems = totals.uniqueItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveGuestCartToStorage(state.items);
    },
    removeGuestItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.cartItemId !== action.payload);
      const totals = recalculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.uniqueItems = totals.uniqueItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveGuestCartToStorage(state.items);
    },
    updateGuestQuantity: (state, action: PayloadAction<{ cartItemId: string; quantity: number }>) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find(item => item.cartItemId === cartItemId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.cartItemId !== cartItemId);
        } else {
          item.quantity = quantity;
        }
      }

      const totals = recalculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.uniqueItems = totals.uniqueItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveGuestCartToStorage(state.items);
    },
    clearGuestCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.uniqueItems = 0;
      state.totalPrice = 0;

      // Clear localStorage
      clearGuestCartFromStorage();
    },
    loadGuestCart: (state) => {
      const guestItems = loadGuestCartFromStorage();
      state.items = guestItems;
      const totals = recalculateTotals(guestItems);
      state.totalItems = totals.totalItems;
      state.uniqueItems = totals.uniqueItems;
      state.totalPrice = totals.totalPrice;
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = recalculateTotals(action.payload);
      state.totalItems = totals.totalItems;
      state.uniqueItems = totals.uniqueItems;
      state.totalPrice = totals.totalPrice;
    },
  },
  extraReducers: (builder) => {
    // Sync guest cart
    builder
      .addCase(syncGuestCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(syncGuestCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        
        if (Array.isArray(action.payload)) {
          state.items = action.payload.map((item: Partial<CartItem>) => ({
            ...item,
            cartItemId: item.cartItemId || generateCartItemId(item.id || '', item.size, item.color),
          })) as CartItem[];
        }
        
        const totals = recalculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.uniqueItems = totals.uniqueItems;
        state.totalPrice = totals.totalPrice;

        // Clear guest cart from localStorage after sync
        clearGuestCartFromStorage();
      })
      .addCase(syncGuestCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Add to cart
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        if (action.payload && 'type' in action.payload) {
          if (action.payload.type === 'guest' && 'item' in action.payload) {
            // Guest: add to local state
            const newItem = action.payload.item;
            if (newItem) {
              const existingItem = state.items.find(item => item.cartItemId === newItem.cartItemId);

              if (existingItem) {
                existingItem.quantity += newItem.quantity;
              } else {
                state.items.push(newItem);
              }
            }

            const totals = recalculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.uniqueItems = totals.uniqueItems;
            state.totalPrice = totals.totalPrice;

            // Save to localStorage
            saveGuestCartToStorage(state.items);
          } else if (action.payload.type === 'authenticated' && 'items' in action.payload) {
            // Authenticated: update from backend response
            if (Array.isArray(action.payload.items)) {
              state.items = action.payload.items.map((item: Partial<CartItem>) => ({
                ...item,
                cartItemId: item.cartItemId || generateCartItemId(item.id || '', item.size, item.color),
              })) as CartItem[];
            }

            const totals = recalculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.uniqueItems = totals.uniqueItems;
            state.totalPrice = totals.totalPrice;
          }
        }
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

        if (action.payload && 'type' in action.payload) {
          if (action.payload.type === 'guest' && 'cartItemId' in action.payload) {
            // Guest: remove from local state
            state.items = state.items.filter(item => item.cartItemId !== action.payload.cartItemId);
            const totals = recalculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.uniqueItems = totals.uniqueItems;
            state.totalPrice = totals.totalPrice;

            // Save to localStorage
            saveGuestCartToStorage(state.items);
          } else if (action.payload.type === 'authenticated' && 'items' in action.payload) {
            // Authenticated: update from backend response
            if (Array.isArray(action.payload.items)) {
              state.items = action.payload.items.map((item: Partial<CartItem>) => ({
                ...item,
                cartItemId: item.cartItemId || generateCartItemId(item.id || '', item.size, item.color),
              })) as CartItem[];
            }

            const totals = recalculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.uniqueItems = totals.uniqueItems;
            state.totalPrice = totals.totalPrice;
          }
        }
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

        if (action.payload && 'type' in action.payload) {
          if (action.payload.type === 'guest' && 'cartItemId' in action.payload && 'quantity' in action.payload) {
            // Guest: update local state
            const { cartItemId, quantity } = action.payload;
            if (quantity !== undefined) {
              const item = state.items.find(item => item.cartItemId === cartItemId);
              
              if (item) {
                if (quantity <= 0) {
                  state.items = state.items.filter(item => item.cartItemId !== cartItemId);
                } else {
                  item.quantity = quantity;
                }
              }
            }

            const totals = recalculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.uniqueItems = totals.uniqueItems;
            state.totalPrice = totals.totalPrice;

            // Save to localStorage
            saveGuestCartToStorage(state.items);
          } else if (action.payload.type === 'authenticated' && 'items' in action.payload) {
            // Authenticated: update from backend response
            if (Array.isArray(action.payload.items)) {
              state.items = action.payload.items.map((item: Partial<CartItem>) => ({
                ...item,
                cartItemId: item.cartItemId || generateCartItemId(item.id || '', item.size, item.color),
              })) as CartItem[];
            }

            const totals = recalculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.uniqueItems = totals.uniqueItems;
            state.totalPrice = totals.totalPrice;
          }
        }
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
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        if (action.payload && 'type' in action.payload) {
          if (action.payload.type === 'guest') {
            // Guest: clear local state
            state.items = [];
            state.totalItems = 0;
            state.uniqueItems = 0;
            state.totalPrice = 0;

            // Clear localStorage
            clearGuestCartFromStorage();
          } else if (action.payload.type === 'authenticated') {
            // Authenticated: clear from backend response
            state.items = [];
            state.totalItems = 0;
            state.uniqueItems = 0;
            state.totalPrice = 0;
          }
        }
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
        
        if (Array.isArray(action.payload)) {
          state.items = action.payload.map((item: Partial<CartItem>) => ({
            ...item,
            cartItemId: item.cartItemId || generateCartItemId(item.id || '', item.size, item.color),
          })) as CartItem[];
        }
        
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

export const { addGuestItem, removeGuestItem, updateGuestQuantity, clearGuestCart, loadGuestCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
