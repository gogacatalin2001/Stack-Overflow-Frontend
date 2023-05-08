import * as api from "../api";
import { getAllQuestions } from "./questionActions";

export const postAnswer =
  (answerData, userToken, navigate) => async (dispatch) => {
    try {
      const { data } = await api.postAnswer(
        answerData.questionId,
        answerData.userId,
        answerData.answerText,
        userToken
      );
      dispatch({ type: "POST_ANSWER", payload: data });
      dispatch(getAllQuestions());
      navigate(`/questions/${answerData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };

export const updateAnswer =
  (answerData, userToken, navigate) => async (dispatch) => {
    try {
      const { data } = await api.updateAnswer(answerData, userToken);
      dispatch({ type: "UPDATE_ANSWER", payload: data });
      dispatch(getAllQuestions());
      navigate(`/questions/${answerData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };

  export const updateAnswerVotes =
  (answerData, userToken, navigate) => async (dispatch) => {
    try {
      await api.updateAnswerVotes(answerData, userToken);
      dispatch({ type: "UPDATE_ANSWER_VOTES", payload: null });
      dispatch(getAllQuestions());
      navigate(`/questions/${answerData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteAnswer =
  (answerData, userToken, navigate) => async (dispatch) => {
    try {
      await api.deleteAnswer(
        answerData.questionId,
        answerData.answerId,
        userToken
      );
      dispatch({ type: "DELETE_ANSWER", payload: null });
      dispatch(getAllQuestions());
      navigate(`/questions/${answerData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };
