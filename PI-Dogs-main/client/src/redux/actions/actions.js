import axios from "axios";
import {
  GET_DOGS,
  GET_TEMPS,
  ORDER_BY,
  DOG_DETAIL,
  GET_DB_DOGS,
  GET_DOGS_BY_TEMP,
  SEARCH_DOG,
} from "./actionsTypes.js";

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

export function getDogDetail(id) {
  return async function (dispatch) {
    let detail = await axios.get(`http://localhost:3001/search/${id}`);
    return dispatch({
      type: DOG_DETAIL,
      payload: detail.data,
    });
  };
}

export function getCreatedDogs(payload) {
  return {
    type: GET_DB_DOGS,
    payload,
  };
}

export function getDogsByTemp(payload) {
  return {
    type: GET_DOGS_BY_TEMP,
    payload,
  };
}

export function searchDog(payload) {
  return {
    type: SEARCH_DOG,
    payload,
  };
}

export function createDog(payload) {
  return async function (dispatch) {
    console.log(payload);
    const data = await axios.post("http://localhost:3001/dbDogs/CreateDog", payload);
    console.log(data);
    return data;
  };
}
