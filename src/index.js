import React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import { NavbarProvider } from "./contexts/ShowNavbarContext";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <NavbarProvider>
      <App />
    </NavbarProvider>
  </AuthProvider>,
  document.getElementById("root")
);
