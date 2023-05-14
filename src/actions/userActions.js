import * as api from "../api";

export const setCurrentUser = (data) => {
  return {
    type: "SET_CURRENT_USER",
    payload: data,
  };
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: "GET_ALL_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (userData, userToken) => async(dispatch) => {
  try {
    await api.updateUser(userData, userToken);
    dispatch(getAllUsers())
  } catch (error) {
    console.log(error);
  }
}
