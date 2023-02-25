import React from "react";
import sytle from "./SearchBar.module.css";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
//import { useState } from "react";
import { orderBy } from "../redux/actions/actions";

export default function SearchBar({ handlerOrder }) {
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temperaments);

  console.log(handlerOrder);

  const handleOrderBy = (e) => {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    handlerOrder(e.target.value);
  };
  return (
    <div className={sytle.searchBar}>
      <div>
        <p>Order by</p>
        <select>
          <option value="Asc" onClick={handleOrderBy}>
            Name: A-Z
          </option>
          <option value="Desc" onClick={handleOrderBy}>
            Name: Z-A
          </option>
          <option value="Min" onClick={handleOrderBy}>
            Min/Max Weight
          </option>
          <option value="Max" onClick={handleOrderBy}>
            Max/Min Weight
          </option>
        </select>
      </div>

      <div className={sytle.filterBy}>
        <p>Filter by</p>
        <select>
          <option value="AllD">All dogs</option>
          <option value="Api">Api</option>
          <option value="Db">DataBb</option>
        </select>
        <select>
          <option value="AllT">All temperaments</option>
          {temps &&
            temps.map((elem) => (
              <option key={elem.id} value={elem.name}>
                {elem.name}
              </option>
            ))}
        </select>
      </div>

      <Search className={sytle.searchI} />
    </div>
  );
}
