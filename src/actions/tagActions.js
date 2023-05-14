import * as api from "../api";

export const getAllTags = () => async(dispatch) => {
    try {
        const { data } = await api.getAllTags();
        dispatch({ type: "GET_ALL_TAGS", payload: data });
      } catch (error) {
        console.log(error);
      }
}