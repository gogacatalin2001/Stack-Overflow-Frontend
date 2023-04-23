import * as api from "../api";

export const getAllQuestions = (userToken) => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions(userToken);
    dispatch({ type: "GET_ALL_QUESTIONS", payload: data });
    localStorage.setItem("Questions", JSON.stringify(data))
  } catch (error) {
    console.log(error);
  }
};

export const askQuestion = (questionData, userToken, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData, userToken);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(getAllQuestions())
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (questionId, userToken, navigate) => async (dispatch) => {
  try {
    await api.deleteQuestion(questionId, userToken);
    dispatch({ type: "DELETE_QUESTION", payload: null });
    dispatch(getAllQuestions())
    navigate("/questions");
  } catch (error) {
    console.log(error);
  }
};

