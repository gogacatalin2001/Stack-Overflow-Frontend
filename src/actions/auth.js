import * as api from "../api";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "./setCurrentUser";

export const signUp = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(jwtDecode(localStorage.getItem('User'))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const logIn = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(jwtDecode(localStorage.getItem('User'))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
