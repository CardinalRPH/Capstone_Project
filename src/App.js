import authReducer from "./stores/authReducer";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AppRouter from "./routes/router";
import { RouterProvider } from "react-router"

const store = configureStore({
  reducer: {
    auth:authReducer
  }
})

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
}

export default App;
