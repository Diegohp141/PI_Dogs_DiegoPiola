import React from "react";
import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function Landingpage() {
  return (
    <div className={style.divContainer}>
      <h1>Welcome to my dog ​​api!</h1>
      <h3>Prepare for cuteness</h3>
      <Link to="/home">
        <button>Enter</button>
      </Link>
    </div>
  );
}
