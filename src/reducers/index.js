import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import questionReducer from './questionReducer'
import { userReducer } from "./userReducer";

export default combineReducers({
  authReducer,
  userReducer,
  questionReducer
});

// TODO add all reducers here