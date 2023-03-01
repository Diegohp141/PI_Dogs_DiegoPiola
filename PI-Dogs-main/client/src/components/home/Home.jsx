import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllDogs, getTemperaments } from "../../redux/actions/actions.js";
import Cards from "../cards/Cards.jsx";
import NavBar from "../navBar/NavBar.jsx";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const dogsToFilter = useSelector((state) => state.dogsToFilter);
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    if (!dogsToFilter.length) dispatch(getAllDogs());
    if (!temperaments.length) dispatch(getTemperaments());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={style.divHome}>
      <NavBar />
      <Cards />
    </div>
  );
}
