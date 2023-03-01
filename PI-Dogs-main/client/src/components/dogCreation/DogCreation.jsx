import React from "react";
import NavBar from "../navBar/NavBar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createDog, getTemperaments, getAllDogs } from "../../redux/actions/actions.js";
import {
  filterArray,
  validateAllErrors,
  validateMax,
  validateMin,
  validateName,
} from "../../validatios.js";
import { useHistory } from "react-router-dom";
import style from "./DogCreation.module.css";
import Swal from "sweetalert2";
console.log("a");

export default function DogCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.temperaments);
  const [inputs, setInputs] = useState({
    name: "",
    minW: "",
    maxW: "",
    minH: "",
    maxH: "",
    minLs: "",
    maxLs: "",
    image: "",
    temperament: [],
  });

  const [error, setError] = useState({
    name: "",
    minW: "",
    maxW: "",
    minH: "",
    maxH: "",
    minLs: "",
    maxLs: "",
    image: "",
    temperament: "you must  choose at least one temperament",
  });

  const [trueFalse, setTrueFalse] = useState(false);

  useEffect(() => {
    if (!temps.length) dispatch(getTemperaments());
    trueOrFalse(validateAllErrors(error));
  }, [dispatch, error]); // eslint-disable-line react-hooks/exhaustive-deps

  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  const handlerInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSelect = (e) => {
    if (inputs.temperament.includes(e.target.value)) {
      console.log(true);
    } else {
      setInputs({
        ...inputs,
        temperament: [...inputs.temperament, e.target.value],
      });
    }

    setError({ ...error, temperament: "" });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const result = {
      name: capitalize(inputs.name),
      height: (inputs.minH || inputs.maxH) === "" ? null : `${inputs.minH} - ${inputs.maxH}`,
      weight: `${inputs.minW} - ${inputs.maxW}`,
      life_span: `${inputs.minLs} - ${inputs.maxLs} years`,
      img: inputs.image.length ? inputs.image : "https://bit.ly/3kxht6a",
      temperament: inputs.temperament,
    };
    dispatch(createDog(result));
    dispatch(getAllDogs());
    //alert(`${result.name} successfully created`);
    //Swal.fire(`${result.name} successfully created`, "", "success");
    Swal.fire({
      title: `${result.name} successfully created`,
      confirmButtonText: "OK",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) history.push("/home");
    });

    //history.push("/home");
  };

  const handlerErrors = (e) => {
    if ([e.target.name][0] === "name") {
      setError({ ...error, [e.target.name]: validateName(e.target.value) });
    } else if (
      [e.target.name][0] === "minW" ||
      [e.target.name][0] === "minH" ||
      [e.target.name][0] === "minLs"
    ) {
      setError({ ...error, [e.target.name]: validateMin(e.target.value) });
    } else if (
      [e.target.name][0] === "maxW" ||
      [e.target.name][0] === "maxH" ||
      [e.target.name][0] === "maxLs"
    ) {
      if ([e.target.name][0] === "maxW")
        setError({ ...error, [e.target.name]: validateMax(e.target.value, inputs.minW, "Weight") });
      if ([e.target.name][0] === "maxH")
        setError({ ...error, [e.target.name]: validateMax(e.target.value, inputs.minH, "Height") });
      if ([e.target.name][0] === "maxLs")
        setError({
          ...error,
          [e.target.name]: validateMax(e.target.value, inputs.minLs, "Life Span"),
        });
      //setError({ ...error, [e.target.name]: validateMax(e.target.value,) });
    } else if ([e.target.name][0] === "img") {
      //TODO
    }
  };

  const multiHandlers = (e) => {
    handlerInput(e);
    handlerErrors(e);
    //if (e.target.value === "") setTrueFalse(false);
  };

  const trueOrFalse = (value) => {
    setTrueFalse(value);
  };

  const handlerDelete = (e) => {
    e.preventDefault();
    //console.log(e.target.id);
    let result = filterArray(inputs.temperament, e.target.id);
    setInputs({ ...inputs, temperament: result });
  };

  return (
    <div className={style.container}>
      <NavBar />
      <form onSubmit={handlerSubmit} className={style.form}>
        <div className={style.divInput}>
          <label>Name:</label>
          <input
            type="text"
            className={style.inputText}
            name="name"
            value={inputs.name}
            onChange={multiHandlers}
          />
        </div>
        {error.name !== "" ? <p className={style.error}>{error.name}</p> : null}
        <div className={style.divInput}>
          <label>Min Weight</label>
          <input
            type="text"
            className={style.inputText}
            name="minW"
            value={inputs.minW}
            onChange={multiHandlers}
          />
        </div>
        {error.minW !== "" ? <p className={style.error}>{error.minW}</p> : null}
        <div className={style.divInput}>
          <label>Max Weight</label>
          <input
            type="text"
            className={style.inputText}
            name="maxW"
            value={inputs.maxW}
            onChange={multiHandlers}
          />
        </div>
        {error.maxW !== "" ? <p className={style.error}>{error.maxW}</p> : null}
        <div className={style.divInput}>
          <label>Min Height</label>
          <input
            type="text"
            className={style.inputText}
            name="minH"
            value={inputs.minH}
            onChange={multiHandlers}
          />
        </div>
        {error.minH !== "" ? <p className={style.error}>{error.minH}</p> : null}
        <div className={style.divInput}>
          <label>Max Height</label>
          <input
            type="text"
            className={style.inputText}
            name="maxH"
            value={inputs.maxH}
            onChange={multiHandlers}
          />
        </div>
        {error.maxH !== "" ? <p className={style.error}>{error.maxH}</p> : null}
        <div className={style.divInput}>
          <label>Min Life Span</label>
          <input
            type="text"
            className={style.inputText}
            name="minLs"
            value={inputs.minLs}
            onChange={multiHandlers}
          />
        </div>
        {error.minLs !== "" ? <p className={style.error}>{error.minLs}</p> : null}
        <div className={style.divInput}>
          <label>Max Life Span</label>
          <input
            type="text"
            className={style.inputText}
            name="maxLs"
            value={inputs.maxLs}
            onChange={multiHandlers}
          />
        </div>
        {error.maxLs !== "" ? <p className={style.error}>{error.maxLs}</p> : null}
        <div className={style.divInput}>
          <label>Img Url</label>
          <input
            type="text"
            className={style.inputText}
            name="image"
            value={inputs.image}
            onChange={multiHandlers}
          />
        </div>
        <div>
          <select className={style.inputSelect}>
            {temps &&
              temps.map((elem) => (
                <option key={elem.id} value={elem.name} onClick={handlerSelect}>
                  {elem.name}
                </option>
              ))}
          </select>
          {error.temperament !== "" || inputs.temperament.length ? (
            <p className={style.error}>{error.temperament}</p>
          ) : (
            <p className={style.error}>you must choose at least one temperament</p>
          )}
        </div>
        <input
          className={inputs.temperament.length ? style.inputSubmit : style.disableInput}
          type="submit"
          value="Create Dog"
          disabled={!trueFalse || !inputs.temperament.length ? true : false}
        />
      </form>
      <div className={style.row}>
        {inputs.temperament.length === 0
          ? null
          : inputs.temperament.map((el, index) => (
              <div className={style.divTemps} key={index}>
                <p className={style.pTemp}>{el}</p>
                <button onClick={handlerDelete} id={el} className={style.btnX}>
                  X
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
