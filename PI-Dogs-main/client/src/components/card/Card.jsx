import React from "react";
import style from "./Card.module.css";
import { NavLink } from "../navBar/NavBar.jsx";

export default function Card({ id, name, weight, image, temperament }) {
  return (
    <div key={id} className={style.cDog}>
      <img src={image} alt={name} className={style.imgD}></img>
      <NavLink
        to={`/dog/${id}`}
        color="white"
        fontSize="1.8vh"
        cursor="pointer"
        fshover="2.3vh"
        padding="0.7vh"
      >
        <h3 id={id}>{name}</h3>
      </NavLink>
      <p className={style.pData}>{`weight: ${weight} kg`}</p>
      <p className={style.pData}>{`temperament: ${temperament}`}</p>
    </div>
  );
}
