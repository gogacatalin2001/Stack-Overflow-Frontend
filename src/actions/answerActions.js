import * as api from "../api";
import { getAllQuestions } from "./questionActions";

export const postAnswer =
  (answerData, userToken, navigate) => async (dispatch) => {
    try {
      const image  = await api.postImage(answerData.image, userToken);
      answerData.image = image.data;
      const { data } = await api.postAnswer(answerData, userToken);
      await dispatch(getAllQuestions());
      dispatch({ type: "POST_ANSWER", payload: data });
      navigate(`/questions/${answerData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };

export const updateAnswer =
  (answerData, userToken, navigate) => async (dispatch) => {
    try {
      const image  = await api.postImage(answerData.image, userToken);
      answerData.image = image.data;
      api.updateAnswer(answerData, userToken);
      await dispatch(getAllQuestions());
      dispatch({ type: "UPDATE_ANSWER", payload: null });
      navigate(`/questions/${answerData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };

export const updateAnswerVotes =
  (answerData, userToken, navigate) => async (dispatch) => {
    try {
      await api.updateAnswerVotes(answerData, userToken);
      await dispatch(getAllQuestions());
      dispatch({ type: "UPDATE_ANSWER_VOTES", payload: null });
      navigate(`/questions/${answerData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteAnswer =
  (answerData, userToken, navigate) => async (dispatch) => {
    try {
      await api.deleteAnswer(answerData, userToken);
      await dispatch(getAllQuestions());
      dispatch({ type: "DELETE_ANSWER", payload: null });
      navigate(`/questions/${answerData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };
