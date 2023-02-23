import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <Link to="/home">
        <h3>Home</h3>
      </Link>
      <Link to="/dog">
        <h3>Create Dog</h3>
      </Link>
    </header>
  );
}
