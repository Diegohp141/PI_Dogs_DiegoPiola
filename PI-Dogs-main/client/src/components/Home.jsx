import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDogs } from "../redux/actions/actions.js";
import Cards from "./Cards.jsx";
import NavBar from "./NavBar.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <SearchBar />
      <Cards />
    </div>
  );
}
