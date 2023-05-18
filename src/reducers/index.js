import { combineReducers } from "redux";
import authReducer from "./authReducer";
import questionReducer from './questionReducer'
import userReducer from "./userReducer";
import answerReducer from "./answerReducer";
import tagReducer from "./tagReducer";
import imageReducer from "./imageReducer";

export default combineReducers({
  authReducer,
  userReducer,
  questionReducer,
  answerReducer,
  tagReducer,
  imageReducer
});

// TODO add all reducers here