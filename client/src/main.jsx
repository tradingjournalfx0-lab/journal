import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  TradeProvider,
} from "./context/TradeContext";

import {
  ThemeProvider,
} from "./context/ThemeContext";

import {
  SubscriptionProvider,
} from "./context/SubscriptionContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <AuthProvider>

      <TradeProvider>

        <ThemeProvider>

          <SubscriptionProvider>

            <App />

          </SubscriptionProvider>

        </ThemeProvider>

      </TradeProvider>

    </AuthProvider>

  </React.StrictMode>

);