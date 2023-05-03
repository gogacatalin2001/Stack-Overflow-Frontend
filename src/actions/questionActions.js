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

export const postQuestion = (questionData, userToken, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData, userToken);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(getAllQuestions())
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = (questionData, userToken, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateQuestion(questionData, userToken);
    dispatch({ type: "UPDATE_QUESTION", payload: data });
    dispatch(getAllQuestions())
    navigate(`/questions/${questionData.questionId}`);
  } catch (error) {
    console.log(error);
  }
}

export const updateQuestionVotes = (questionData, userToken, navigate) => async (dispatch) => {
  try {
    await api.updateQuestionVotes(questionData, userToken);
    dispatch({ type: "UPDATE_QUESTION_VOTES", payload: null});
    dispatch(getAllQuestions())
    navigate(`/questions/${questionData.questionId}`);
  } catch (error) {
    console.log(error);
  }
}

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

