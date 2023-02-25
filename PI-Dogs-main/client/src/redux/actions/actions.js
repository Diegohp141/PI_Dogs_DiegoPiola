import axios from "axios";
import { GET_DOGS, GET_TEMPS, ORDER_BY } from "./actionsTypes.js";

export function getAllDogs() {
  return async function (dispatch) {
    let res = await axios.get("http://localhost:3001/");
    return dispatch({
      type: GET_DOGS,
      payload: res.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    let temps = await axios.get("http://localhost:3001/tempsD");
    return dispatch({
      type: GET_TEMPS,
      payload: temps.data,
    });
  };
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload,
  };
}
