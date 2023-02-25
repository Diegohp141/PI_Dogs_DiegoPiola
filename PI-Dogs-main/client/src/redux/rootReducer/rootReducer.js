import { GET_DOGS, GET_TEMPS, ORDER_BY } from "../actions/actionsTypes.js";

const initialState = {
  allDogs: [],
  dogsToFilter: [],
  temperaments: [],
  detail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogsToFilter: action.payload,
      };
    case GET_TEMPS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case ORDER_BY:
      let arrSorted;
      if (action.payload === "Asc") {
        arrSorted = state.dogsToFilter.sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
      } else if (action.payload === "Desc") {
        arrSorted = state.dogsToFilter.sort(function (a, b) {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        });
      } else if (action.payload === "Min") {
        arrSorted = state.dogsToFilter.sort(function (a, b) {
          if (a.weight > b.weight) return 1;
          if (b.weight > a.weight) return -1;
          return 0;
        });
      } else {
        arrSorted = state.dogsToFilter.sort(function (a, b) {
          if (a.weight > b.weight) return -1;
          if (b.weight > a.weight) return 1;
          return 0;
        });
      }
      return {
        ...state,
        dogsToFilter: arrSorted,
      };
    default:
      return state;
  }
}

export default rootReducer;
