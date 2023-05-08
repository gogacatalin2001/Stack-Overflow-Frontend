export const setCurrentUser = (data) => {
  return {
    type: "SET_CURRENT_USER",
    payload: data,
  };
};

export const updateUser = (data) => {
  return {
    type: "UPDATE_USER",
    payload: data,
  };
}