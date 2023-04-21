import * as api from "../api";

export const getAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "GET_ALL_QUESTIONS", payload: data });
    localStorage.setItem("Questions", JSON.stringify(data))
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = (questionId, navigate) => async (dispatch) => {
  try {
    const { data } = await api.getQuestion(questionId);
    dispatch({ type: "GET_QUESTION", payload: data });
    localStorage.setItem("Question", JSON.stringify(data))
    navigate(`/questions/${questionId}`);
  } catch (error) {
    console.log(error);
  }
};

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(getAllQuestions())
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
