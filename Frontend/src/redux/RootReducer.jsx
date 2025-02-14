// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import UserAuthenticationSlice from "./Slices/UserAuthenticationSlice";

const rootReducer = combineReducers({
  UserAuthentication: UserAuthenticationSlice.reducer,
});

export default rootReducer;
