import * as api from "../api";
import { getAllQuestions } from "./questionActions";

export const postAnswer = (answerData, userToken, navigate) => async (dispatch) => {
  try {

    const { data } = await api.postAnswer(
      answerData.questionId,
      answerData.userId,
      answerData.answerText,
      userToken
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(getAllQuestions(userToken));
    navigate(`/questions/${answerData.questionId}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (answerData, userToken, navigate) => async (dispatch) => {
  try {
    await api.deleteAnswer(
      answerData.questionId,
      answerData.answerId,
      userToken
    );
    dispatch({ type: "DELETE_ANSWER", payload: null });
    dispatch(getAllQuestions(userToken));
    navigate(`/questions/${answerData.questionId}`);
  } catch (error) {
    console.log(error);
  }
};
