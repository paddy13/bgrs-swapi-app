import reducer from "./Reducers";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import { createRoot } from "react-dom/client";
import { configureStore } from '@reduxjs/toolkit';
import App from "./App";

const store = configureStore({reducer});
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
