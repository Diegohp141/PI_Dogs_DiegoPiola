import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import rootReducer from "../rootReducer/rootReducer.js";
console.log("a");

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
