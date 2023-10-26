import React from "react";
import { AiOutlineCar } from "react-icons/ai";

export default function Navbar() {
  console.log("hello");

  return (
    <header className="navbar-container">
      <div className="flex items-center gap-2 text-3xl font-semibold text-red-500">
        <AiOutlineCar size={34} />
        <div>Carsties Auctions</div>
      </div>
      <div>Search</div>
      <div>Login</div>
    </header>
  );
}
