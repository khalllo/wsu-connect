// Importing necessary functions and modules from Redux Toolkit and related packages
import { combineReducers, configureStore } from "@reduxjs/toolkit"; // For combining reducers and configuring Redux store
import userReducer from "./user/userSlice.js"; // Importing userReducer from userSlice.js
import { persistReducer, persistStore } from "redux-persist"; // For persisting Redux state
import storage from "redux-persist/lib/storage"; // Default storage engine for persisting Redux state

// Combining reducers into a single rootReducer
const rootReducer = combineReducers({ user: userReducer });

// Configuration for persisting Redux state
const persistConfig = {
  key: "root", // Key for identifying the persisted state
  version: 1, // Version of the persisted state
  storage, // Storage engine for persisting state
};

// Creating a persisted reducer by combining rootReducer with persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring Redux store with persistedReducer and additional middleware
export const store = configureStore({
  reducer: persistedReducer, // Set the reducer to the persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check to allow persisting Redux state
    }),
});

// Creating a persistor to persist Redux store
export const persistor = persistStore(store);
