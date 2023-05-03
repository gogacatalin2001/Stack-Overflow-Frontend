export const setCurrentUser = (data) => {
  return {
    type: "FETCH_CURRENT_USER",
    payload: data,
  };
};

export const updateUser = (data) => {
  return {
    type: "UPDATE_USER",
    payload: data,
  };
}

export const logOut = () => {
  localStorage.removeItem("User")
  return {
    type: "LOG_OUT",
    payload: null,
  };
}

// TODO decrease user score by 1.5 points when he downvotes an answer