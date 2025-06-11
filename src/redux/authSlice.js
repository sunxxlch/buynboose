import { createSlice } from '@reduxjs/toolkit';

const savedAuth = JSON.parse(localStorage.getItem('auth'));

const initialState = {
  isAuthenticated: savedAuth ? true : false,
  username: savedAuth?.username || null,
  role: savedAuth?.role || null,
  accessToken: savedAuth?.accessToken || null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = null;
      state.role = null;
      state.accessToken = null;
      localStorage.removeItem('auth');
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
