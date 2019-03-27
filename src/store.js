import { createStore, combineReducers } from "redux";
import persistState from "redux-localstorage";
import user from "./Session/reducer";

const rootReducer = combineReducers({
  user: user
});

const enhancer = persistState(rootReducer.place);

const store = createStore(rootReducer, {}, enhancer);

export { store };