import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const UserAuthenticationSlice = createSlice({
  name: "UserAuthentication",
  initialState,
  reducers: {
    UserSignInRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    UserSigninSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    UserSignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UserLogout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const {
  UserSignInRequest,
  UserSigninSuccess,
  UserSignInFailure,
  UserLogout,
} = UserAuthenticationSlice.actions;

export default UserAuthenticationSlice;
