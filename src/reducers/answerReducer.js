const answerReducer = (state = null, action) => {
  switch (action.type) {
    case "POST_ANSWER":
      return state;
    case "DELETE_ANSWER":
      return state;
    default:
      return state;
  }
};

export default answerReducer;
