const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case "AUTH":
      return action.payload;
      
    default:
      return state;
  }
};

export default authReducer
