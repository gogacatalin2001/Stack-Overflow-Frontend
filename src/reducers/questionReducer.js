const questionReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_QUESTIONS":
      return action.payload;
    case "POST_QUESTION":
      return state;
    case "UPDATE_QUESTION":
        return state;
    case "UPDATE_QUESTION_VOTES":
      return state;
    case "DELETE_QUESTION":
      return state;
    default:
      return state;
  }
};

export default questionReducer;
