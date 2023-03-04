import React from "react";
import style from "./InputText.module.css";

export default function InputText({ label, name, value, handler, state }) {
  return (
    <>
      <div className={style.divInput}>
        <label>{label}:</label>
        <input
          type="text"
          name={name}
          value={value}
          className={style.inputText}
          onChange={handler}
        />
      </div>
      {state[`${name}`].error ? <p>{state[`${name}`].error}</p> : null}
    </>
  );
}
