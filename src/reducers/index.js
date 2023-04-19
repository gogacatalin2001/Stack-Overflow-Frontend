import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { currentUserReducer } from "./currentUserReducer";
import { askQuestion } from "../actions/askQuestion";

export default combineReducers({
  authReducer,
  currentUserReducer,
  askQuestion
});
