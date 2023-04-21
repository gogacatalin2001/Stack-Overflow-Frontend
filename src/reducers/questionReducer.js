const questionReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_QUESTION":
      return action.payload;
      case "GET_ALL_QUESTIONS":
      return action.payload;
    case "POST_QUESTION":
      return state;
    default:
      return state;
  }
};

export default questionReducer
