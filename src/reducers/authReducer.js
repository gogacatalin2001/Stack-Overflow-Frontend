const authReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("Token", JSON.stringify(action.payload));
      return { ...state, token: action.payload }
    case "LOGOUT":
      localStorage.setItem("Token", JSON.stringify(action.payload));
      return { ...state, token: action.payload }
    default:
      return state;
  }
};

export default authReducer;
