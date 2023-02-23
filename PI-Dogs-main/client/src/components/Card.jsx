import React from "react";
import style from "./Card.module.css";

export default function Card({ id, name, height, weight, image }) {
  return (
    <div key={id} className={style.cDog}>
      <img src={image} alt={name} className={style.imgD}></img>
      <h3 id={id}>{name}</h3>
      <p>{`${height} height`}</p>
      <p>{`${weight} weight`}</p>
    </div>
  );
}
