import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App.tsx";
import "./index.css";
import { AuthState } from "./context/AuthContext.tsx";
import { ExpenseState } from "./context/ExpenseContext.tsx";
import FallBackRender from "./util/FallbackRender.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="bottom-center" />
    <ErrorBoundary fallbackRender={FallBackRender}>
      <AuthState>
        <ExpenseState>
          <App />
        </ExpenseState>
      </AuthState>
    </ErrorBoundary>
  </React.StrictMode>
);
