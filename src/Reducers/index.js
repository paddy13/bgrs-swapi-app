import { combineReducers } from "redux";
import characterReducer from "./characterReducer";
import updateMovieReducer from "./updateMovieReducer";

export default combineReducers({
  characterReducer,
  updateMovieReducer,
});
