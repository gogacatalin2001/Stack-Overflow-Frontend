const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case "FETCH_CURRENT_USER":
      return { ...state, user: action.payload };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
