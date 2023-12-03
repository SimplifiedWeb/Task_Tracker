import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { taskApi } from "../api/ApiFetching";
import rootReducer from "../RootReducer";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});
export default store;
