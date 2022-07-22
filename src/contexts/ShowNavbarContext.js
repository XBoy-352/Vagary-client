import React, { useContext, useState } from "react";

const NavbarContext = React.createContext();

export function useNavbar() {
  return useContext(NavbarContext);
}

export function NavbarProvider({ children }) {
  const [navbar, setNavbar] = useState("");

  function showNavbar() {
    setNavbar("active");
  }

  function hideNavbar() {
    setNavbar("");
  }

  const value = {
    navbar,
    showNavbar,
    hideNavbar,
  };

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
}
