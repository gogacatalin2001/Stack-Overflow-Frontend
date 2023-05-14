const tagReducer = (state = { tags: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_TAGS":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default tagReducer;
