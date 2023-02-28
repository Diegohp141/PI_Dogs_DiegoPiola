import React from "react";
import style from "./SearchBar.module.css";
import Search from "../search/Search.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getCreatedDogs, orderBy, getDogsByTemp } from "../../redux/actions/actions.js";

export default function SearchBar({ setPage, handlerOrder, order }) {
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temperaments);

  const handleOrderBy = (e) => {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setPage(1);
    handlerOrder(`Ordenado ${e.target.value}`);
  };

  const handlerDbOrApi = (e) => {
    e.preventDefault();
    dispatch(getCreatedDogs(e.target.value));
  };

  const handlerTemperaments = (e) => {
    e.preventDefault();
    dispatch(getDogsByTemp(e.target.value));
  };
  return (
    <div className={style.searchBar}>
      <div className={style.orderBy}>
        <p className={style.pOrderBy}>Order by</p>
        <select className={style.sOrderBy}>
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

      <div className={style.filterBy}>
        <p className={style.pFilterBy}>Filter by</p>
        <select className={style.sFilterBy}>
          <option value="AllD" onClick={handlerDbOrApi}>
            All dogs
          </option>
          <option value="Api" onClick={handlerDbOrApi}>
            Api
          </option>
          <option value="Db" onClick={handlerDbOrApi}>
            DataBb
          </option>
        </select>
        <select className={style.sFilterBy}>
          <option value="AllT" onClick={handlerTemperaments}>
            All temperaments
          </option>
          {temps &&
            temps.map((elem) => (
              <option key={elem.id} value={elem.name} onClick={handlerTemperaments}>
                {elem.name}
              </option>
            ))}
        </select>
      </div>
      <Search setPage={setPage} />
    </div>
  );
}
