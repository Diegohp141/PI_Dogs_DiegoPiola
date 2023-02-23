import { GET_DOGS } from "../actions/actionsTypes.js";

const initialState = {
  allDogs: [],
  dogsToFilter: [],
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
    default:
      return state;
  }
}

export default rootReducer;
