import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDog } from "../../redux/actions/actions";

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
        placeholder="Search dog"
        value={search}
        onChange={handlerInput}
        onKeyDown={handlerEnter}
      />
      <button onClick={handlerSearch}>Search</button>
    </div>
  );
}
