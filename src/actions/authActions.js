import jwtDecode from "jwt-decode";

import * as api from "../api";
import { setCurrentUser } from "./userActions";

export const signUp = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", payload: data });
    dispatch(setCurrentUser(JSON.stringify(jwtDecode(data))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const logIn = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    let user = jwtDecode(data.token)
    if (user.banned !== true) {
      dispatch({ type: "AUTH", payload: data });
      dispatch(setCurrentUser(JSON.stringify(jwtDecode(data.token))));
      navigate("/");
    } else {
      console.log("You have been banned")
      navigate("/banned")
    }
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({
    type: "LOGOUT",
    payload: null,
  });
};
