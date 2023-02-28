import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs, getTemperaments } from "../../redux/actions/actions.js";
import Cards from "../cards/Cards.jsx";
import NavBar from "../navBar/NavBar.jsx";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={style.divHome}>
      <NavBar />
      <Cards />
    </div>
  );
}
