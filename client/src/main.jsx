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


// seo
import { HelmetProvider }
from "react-helmet-async";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <HelmetProvider>

      <AuthProvider>

      <TradeProvider>

        <ThemeProvider>

          <SubscriptionProvider>

            <App />

          </SubscriptionProvider>

        </ThemeProvider>

      </TradeProvider>

    </AuthProvider>

  </HelmetProvider>

  </React.StrictMode>

);