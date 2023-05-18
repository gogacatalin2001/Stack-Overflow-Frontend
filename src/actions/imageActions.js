import * as api from "../api";
import { Buffer } from "buffer";

export const getImageData = (imageId) => async (dispatch) => {
  try {
    const image = await api.getImage(imageId);
    let base64ImageString = Buffer.from(image.data, "binary").toString("base64");
    dispatch({ type: "GET_IMAGE_DATA", payload: base64ImageString });
  } catch (error) {
    console.log(error);
  }
};
