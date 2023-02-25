import React from "react";
import style from "./Pagination.module.css";

export default function Pagination({ dogsPerPage, dogs, pagination }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className={style.ulDogs}>
        {pageNumber.map((number) => (
          <li key={number}>
            <button onClick={() => pagination(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
