const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, user:JSON.parse(action?.payload) };
    case "GET_CURRENT_USER":
      return { ...state, user:JSON.parse(action?.payload) };
    case "UPDATE_USER":
      return { ...state, user:JSON.parse(action?.payload) };
    default:
      return state;
  }
};

export default userReducer;
