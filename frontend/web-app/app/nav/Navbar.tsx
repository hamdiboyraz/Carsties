import React from "react";
import Search from "./Search";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="navbar-container">
      <Logo />
      <Search />
      <div>Login</div>
    </header>
  );
}
