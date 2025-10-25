import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../Types/ProjectTypes';

interface UserState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, clearUser } = userSlice.actions;
export default userSlice.reducer;
