import React from "react";
import NavBar from "../navBar/NavBar.jsx";
import InputText from "../inputText/InputText.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createDog, getTemperaments, getAllDogs } from "../../redux/actions/actions.js";
import { useHistory } from "react-router-dom";
import style from "./DogCreation.module.css";
import {
  formatString,
  validateName,
  validateMin,
  validateMax,
  validateValues,
  filterArray,
} from "../../validatios.js";
import Swal from "sweetalert2";

export default function DogCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.temperaments);

  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    if (!temps.length) dispatch(getTemperaments());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [input, setInput] = useState({
    name: { info: "", error: "" },
    minWeight: { info: "", error: "" },
    maxWeight: { info: "", error: "" },
    minHeight: { info: "", error: "" },
    maxHeight: { info: "", error: "" },
    minLifeSpan: { info: "", error: "" },
    maxLifeSpan: { info: "", error: "" },
    img: {
      info: "",
      error: "you must enter the url of an image otherwise a default image will be assigned",
    },
    temperament: [],
    valuesNames: [
      "name",
      "minWeight",
      "maxWeight",
      "minHeight",
      "maxHeight",
      "minLifeSpan",
      "maxLifeSpan",
    ],
  });

  const [disable, setDisable] = useState(true);

  const handlerInput = (e) => {
    if (formatString([e.target.name][0]) === "name") {
      setInput({
        ...input,
        [e.target.name]: {
          ...input[e.target.name],
          info: e.target.value,
          error: validateName(e.target.value),
        },
      });
      setDisable(Boolean(validateName(e.target.value)));
    } else if (formatString([e.target.name][0])[0] === "min") {
      setInput({
        ...input,
        [e.target.name]: {
          ...input[e.target.name],
          info: e.target.value,
          error: validateMin(e.target.value),
        },
      });
      setDisable(Boolean(validateMin(e.target.value)));
    } else if (formatString([e.target.name][0])[0] === "max") {
      setInput({
        ...input,
        [e.target.name]: {
          ...input[e.target.name],
          info: e.target.value,
          error: validateMax(
            e.target.value,
            input[`min${formatString([e.target.name][0])[1]}`].info,
            formatString([e.target.name][0])[1]
          ),
        },
      });
      setDisable(
        Boolean(
          validateMax(
            e.target.value,
            input[`min${formatString([e.target.name][0])[1]}`].info,
            formatString([e.target.name][0])[1]
          )
        )
      );
    } else if (formatString([e.target.name][0]) === "img") {
      setInput({
        ...input,
        [e.target.name]: {
          ...input[e.target.name],
          info: e.target.value,
          error: "you must enter the url of an image otherwise a default image will be assigned",
        },
      });
    }
  };

  const handlerSelect = (e) => {
    if (!input.temperament.includes(e.target.value)) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  };

  const handlerDelete = (e) => {
    e.preventDefault();
    let result = filterArray(input.temperament, e.target.id);
    setInput({ ...input, temperament: result });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const result = {
      name: capitalize(input.name.info),
      height:
        (input.minHeight.info || input.maxHeight.info) === ""
          ? null
          : `${input.minHeight.info} - ${input.maxHeight.info}`,
      weight: `${input.minWeight.info} - ${input.maxWeight.info}`,
      life_span: `${input.minLifeSpan.info} - ${input.minLifeSpan.info} years`,
      img: input.img.info.length ? input.img.info : "https://bit.ly/3kxht6a",
      temperament: input.temperament,
    };
    dispatch(createDog(result));
    dispatch(getAllDogs());
    Swal.fire({
      title: `${result.name} successfully created`,
      confirmButtonText: "OK",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) history.push("/home");
    });
  };

  return (
    <div className={style.container}>
      <NavBar />

      <form onSubmit={handlerSubmit} className={style.form}>
        <InputText
          label="Breed name"
          name="name"
          value={input.name.info}
          handler={handlerInput}
          state={input}
        />
        <InputText
          label="Min weight"
          name="minWeight"
          value={input.minWeight.info}
          handler={handlerInput}
          state={input}
        />
        <InputText
          label="Max weight"
          name="maxWeight"
          value={input.maxWeight.info}
          handler={handlerInput}
          state={input}
        />
        <InputText
          label="Min height"
          name="minHeight"
          value={input.minHeight.info}
          handler={handlerInput}
          state={input}
        />
        <InputText
          label="Max height"
          name="maxHeight"
          value={input.maxHeight.info}
          handler={handlerInput}
          state={input}
        />
        <InputText
          label="Min life span"
          name="minLifeSpan"
          value={input.minLifeSpan.info}
          handler={handlerInput}
          state={input}
        />
        <InputText
          label="Max life span"
          name="maxLifeSpan"
          value={input.maxLifeSpan.info}
          handler={handlerInput}
          state={input}
        />
        <InputText
          label="Image Url"
          name="img"
          value={input.img.info}
          handler={handlerInput}
          state={input}
        />

        <div>
          <select className={style.inputelect}>
            {temps &&
              temps.map((elem) => (
                <option key={elem.id} value={elem.name} onClick={handlerSelect}>
                  {elem.name}
                </option>
              ))}
          </select>
        </div>
        <input
          disabled={
            disable || !input.temperament.length || validateValues(input.valuesNames, input)
              ? true
              : false
          }
          className={
            !input.temperament.length || validateValues(input.valuesNames, input)
              ? style.disableInput
              : style.inputSubmit
          }
          type="submit"
          value="Create Dog"
        />
      </form>
      <div className={style.row}>
        {input.temperament.length === 0
          ? null
          : input.temperament.map((el, index) => (
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
