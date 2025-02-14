import { configureStore } from "@reduxjs/toolkit"

import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage" // Default storage (localStorage for web)
import rootReducer from "./src/redux/RootReducer"

const persistConfig = {
  key: "root", // Key to store the data in localStorage
  storage,
  whitelist: ["UserAuthentication"] // Specify slices to persist (e.g., authentication data)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false // Disable serializable checks for redux-persist
    })
})

export const persistor = persistStore(store)

export default store
