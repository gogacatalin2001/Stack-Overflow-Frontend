const questionReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_QUESTIONS":
      return { ...state, questions: action.payload };
    case "GET_QUESTION":
      return state;
    case "GET_FILTERED_QUESTIONS":
      return { ...state, questions: action.payload };
    case "POST_QUESTION":
      return state;
    case "UPDATE_QUESTION":
      return { ...state, questions: action.payload };
    case "UPDATE_QUESTION_VOTES":
      return state;
    case "DELETE_QUESTION":
      return state;
    default:
      return state;
  }
};

export default questionReducer;
