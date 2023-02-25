import {
  GET_DOGS,
  GET_TEMPS,
  ORDER_BY,
  DOG_DETAIL,
  GET_DB_DOGS,
  GET_DOGS_BY_TEMP,
} from "../actions/actionsTypes.js";

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

    case DOG_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_DB_DOGS:
      const resetDogs = state.allDogs;
      const dbOrApi =
        action.payload === "Db"
          ? resetDogs.filter((el) => el.createdByDB)
          : resetDogs.filter((el) => !el.createdByDB);
      return {
        ...state,
        dogsToFilter: action.payload === "AllD" ? state.allDogs : dbOrApi,
      };
    case GET_DOGS_BY_TEMP:
      const resetDogs2 = state.allDogs;
      const dogsByTemps =
        action.payload === "AllT"
          ? resetDogs2
          : resetDogs2.filter((el) =>
              el.temperament !== undefined && el.temperament.includes(action.payload) ? el : null
            );
      return {
        ...state,
        dogsToFilter: dogsByTemps,
      };
    default:
      return state;
  }
}

export default rootReducer;
