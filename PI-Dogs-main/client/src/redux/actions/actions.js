import axios from "axios";
import { GET_DOGS } from "./actionsTypes.js";

export function getAllDogs() {
  return async function (dispatch) {
    let res = await axios.get("http://localhost:3001/");
    return dispatch({
      type: GET_DOGS,
      payload: res.data,
    });
  };
}
