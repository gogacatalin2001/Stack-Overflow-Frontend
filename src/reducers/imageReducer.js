const imageReducer = (state = { image: null }, action) => {
  switch (action.type) {
    case "GET_IMAGE_DATA":
      return { ...state, image: action.payload };
    default:
      return state;
  }
};

export default imageReducer;
