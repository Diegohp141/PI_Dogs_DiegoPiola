import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import style from "./Cards.module.css";

export default function Cards() {
  const dogs = useSelector((state) => state.dogsToFilter);
  return (
    <section className={style.dSection}>
      {dogs &&
        dogs.map((dog) => (
          <Card
            id={dog.id}
            name={dog.name}
            height={dog.height}
            weight={dog.weight}
            image={dog.image ? dog.image : dog.img}
            key={dog.id}
          />
        ))}
    </section>
  );
}
