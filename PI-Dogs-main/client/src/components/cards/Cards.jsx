import React from "react";
import { useState } from "react";
import Card from "../card/Card.jsx";
import Pagination from "../pagination/Pagination.jsx";
import { useSelector /* , useDispatch */ } from "react-redux";
import style from "./Cards.module.css";
import SearchBar from "../searchBar/SearchBar.jsx";

export default function Cards() {
  //const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogsToFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexFirstDog, indexLastDog);
  const [order, setOrder] = useState("");

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <SearchBar handlerpage={setCurrentPage} handlerOrder={setOrder} order={order} />
      <Pagination dogsPerPage={dogsPerPage} dogs={dogs.length} pagination={pagination} />
      <section className={style.dSection}>
        {currentDogs &&
          currentDogs.map((dog) => (
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
    </>
  );
}
