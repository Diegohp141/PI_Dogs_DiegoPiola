import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ id, name, weight, image, temperament }) {
  return (
    <div key={id} className={style.cDog}>
      <img src={image} alt={name} className={style.imgD}></img>
      <Link to={`/dog/${id}`}>
        <h3 id={id}>{name}</h3>
      </Link>
      <p>{`weight: ${weight} kg`}</p>
      <p>{`temperament: ${temperament}`}</p>
    </div>
  );
}
