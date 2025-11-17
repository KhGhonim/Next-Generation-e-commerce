import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import wishlistSlice from './slices/wishlistSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart', 'wishlist'], // Only persist user, cart, and wishlist
};

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
