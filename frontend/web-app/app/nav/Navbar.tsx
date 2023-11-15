import React from "react";
import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";

export default function Navbar() {
  return (
    <header className="navbar-container">
      <Logo />
      <Search />
      <LoginButton />
    </header>
  );
}
