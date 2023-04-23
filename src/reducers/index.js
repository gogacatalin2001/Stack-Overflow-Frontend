import { combineReducers } from "redux";
import authReducer from "./authReducer";
import questionReducer from './questionReducer'
import userReducer from "./userReducer";
import answerReducer from "./answerReducer";

export default combineReducers({
  authReducer,
  userReducer,
  questionReducer,
  answerReducer
});

// TODO add all reducers here