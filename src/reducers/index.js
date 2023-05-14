import { combineReducers } from "redux";
import authReducer from "./authReducer";
import questionReducer from './questionReducer'
import userReducer from "./userReducer";
import answerReducer from "./answerReducer";
import tagReducer from "./tagReducer";

export default combineReducers({
  authReducer,
  userReducer,
  questionReducer,
  answerReducer,
  tagReducer
});

// TODO add all reducers here