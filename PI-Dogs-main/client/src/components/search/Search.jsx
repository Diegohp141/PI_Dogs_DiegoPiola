import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDog } from "../../redux/actions/actions";
import style from "./Search.module.css";

export default function Search({ setPage }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handlerInput = (e) => {
    setSearch(e.target.value);
  };

  const handlerSearch = (e) => {
    e.preventDefault();
    dispatch(searchDog(search.trim().toLowerCase()));
    setPage(1);
    setSearch("");
  };

  const handlerEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(searchDog(search.trim().toLowerCase()));
      setPage(1);
      setSearch("");
    }
  };
  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Search dog breed"
        value={search}
        onChange={handlerInput}
        onKeyDown={handlerEnter}
        className={style.iSearch}
      />
      <button onClick={handlerSearch} className={style.btnSearch}>
        Search
      </button>
    </div>
  );
}
