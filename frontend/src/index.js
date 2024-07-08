import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { StockContextProvider } from "./contexts/StockContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StockContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </StockContextProvider>
  </React.StrictMode>
);
