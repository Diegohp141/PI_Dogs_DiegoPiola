import React from "react";
import NavBar from "../navBar/NavBar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createDog, getTemperaments } from "../../redux/actions/actions.js";
import { validateAllErrors, validateMax, validateMin, validateName } from "../../validatios.js";
import style from "./DogCreation.module.css";

export default function DogCreation() {
  const dispatch = useDispatch();
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
    dispatch(getTemperaments());
    trueOrFalse(validateAllErrors(error));
  }, [dispatch, error]);

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
    setInputs({
      ...inputs,
      temperament: [...inputs.temperament, e.target.value],
    });

    setError({ ...error, temperament: "" });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const result = {
      name: capitalize(inputs.name),
      height: (inputs.minH || inputs.maxH) === "" ? null : `${inputs.minH} - ${inputs.maxH}`,
      weight: `${inputs.minW} - ${inputs.maxW}`,
      life_span: `${inputs.minLs} - ${inputs.maxLs} years`,
      img: `${inputs.image}`,
      temperament: inputs.temperament,
    };
    dispatch(createDog(result));
    setInputs({
      name: "",
      minW: "",
      maxW: "",
      minH: "",
      maxH: "",
      minLs: "",
      maxLs: "",
      image: "",
      temperament: "",
    });
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
  };

  const trueOrFalse = (value) => {
    setTrueFalse(value);
  };

  return (
    <div className={style.formContainer}>
      <NavBar />
      <form onSubmit={handlerSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={inputs.name} onChange={multiHandlers} />
          {error.name !== "" ? <p>{error.name}</p> : null}
        </div>
        <div>
          <label>Min Weight</label>
          <input type="text" name="minW" value={inputs.minW} onChange={multiHandlers} />
          {error.minW !== "" ? <p>{error.minW}</p> : null}
        </div>
        <div>
          <label>Max Weight</label>
          <input type="text" name="maxW" value={inputs.maxW} onChange={multiHandlers} />
          {error.maxW !== "" ? <p>{error.maxW}</p> : null}
        </div>
        <div>
          <label>Min Height</label>
          <input type="text" name="minH" value={inputs.minH} onChange={multiHandlers} />
          {error.minH !== "" ? <p>{error.minH}</p> : null}
        </div>
        <div>
          <label>Max Height</label>
          <input type="text" name="maxH" value={inputs.maxH} onChange={multiHandlers} />
          {error.maxH !== "" ? <p>{error.maxH}</p> : null}
        </div>
        <div>
          <label>Min Life Span</label>
          <input type="text" name="minLs" value={inputs.minLs} onChange={multiHandlers} />
          {error.minLs !== "" ? <p>{error.minLs}</p> : null}
        </div>
        <div>
          <label>Max Life Span</label>
          <input type="text" name="maxLs" value={inputs.maxLs} onChange={multiHandlers} />
          {error.maxLs !== "" ? <p>{error.maxLs}</p> : null}
        </div>
        <div>
          <label>Img Url</label>
          <input type="text" name="image" value={inputs.image} onChange={multiHandlers} />
        </div>
        <div>
          <select>
            {temps &&
              temps.map((elem) => (
                <option key={elem.id} value={elem.name} onClick={handlerSelect}>
                  {elem.name}
                </option>
              ))}
          </select>
          {error.temperament !== "" ? <p>{error.temperament}</p> : null}
        </div>
        {trueFalse === true ? console.log("a") : console.log("b")}
        <input type="submit" value="Create Dog" disabled={!trueFalse} />
      </form>
      {inputs.temperament.length === 0
        ? null
        : inputs.temperament.map((el, index) => (
            <div key={index}>
              <p>{el}</p>
            </div>
          ))}
    </div>
  );
}
