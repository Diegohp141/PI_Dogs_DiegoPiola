import React from "react";
import NavBar from "../navBar/NavBar.jsx";
import InputText from "../inputText/InputText.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  /*  createDog, */ getTemperaments /* , getAllDogs */,
} from "../../redux/actions/actions.js";
import { useHistory } from "react-router-dom";
import style from "./DogCreation.module.css";
//import Swal from "sweetalert2";

export default function DogCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.temperaments);

  /*  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  } */

  useEffect(() => {
    if (!temps.length) dispatch(getTemperaments());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [input, setInput] = useState({
    name: { info: "", error: "" },
    minW: { info: "", error: "" },
    maxW: { info: "", error: "" },
    minH: { info: "", error: "" },
    maxH: { info: "", error: "" },
    minLs: { info: "", error: "" },
    maxLs: { info: "", error: "" },
    img: { info: "", error: "" },
    temperament: [],
  });

  const handlerInput = (e) => {
    /* setInput({
      ...input,
      [e.target.name]: { info: e.target.value },
    }); */
    console.log([e.target.name]["info"]);
  };

  const handlerSelect = (e) => {
    console.log(e.target.value);
  };

  /* const handlerDelete = (e) => {
    e.preventDefault();
    //console.log(e.target.id);
    let result = filterArray(inputs.temperament, e.target.id);
    setInputs({ ...inputs, temperament: result });
  }; */

  return (
    <div className={style.container}>
      <NavBar />

      <form className={style.form}>
        <InputText
          label="Breed name"
          name="name"
          /* value={input.name.info} */ handler={handlerInput}
        />
        <InputText
          label="Min weight"
          name="minW"
          /* value={input.minW.info} */ handler={handlerInput}
        />
        <InputText
          label="Max weight"
          name="maxW"
          /* value={input.maxW.info} */ handler={handlerInput}
        />
        <InputText
          label="Min height"
          name="minH"
          /* value={input.minH.info} */ handler={handlerInput}
        />
        <InputText
          label="Max height"
          name="maxH"
          /* value={input.maxH.info} */ handler={handlerInput}
        />
        <InputText
          label="Min life span"
          name="minLs"
          value={input.minLs.info}
          handler={handlerInput}
        />
        <InputText
          label="Max life span"
          name="maxLs"
          value={input.maxLs.info}
          handler={handlerInput}
        />
        <InputText label="Image Url" name="img" value={input.img.info} handler={handlerInput} />

        <div>
          <select className={style.inputSelect}>
            {temps &&
              temps.map((elem) => (
                <option key={elem.id} value={elem.name} onClick={handlerSelect}>
                  {elem.name}
                </option>
              ))}
          </select>
        </div>
      </form>
    </div>
  );
}
