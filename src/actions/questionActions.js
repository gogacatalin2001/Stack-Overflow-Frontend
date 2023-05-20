import * as api from "../api";
import { Buffer } from "buffer";

export const getAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    localStorage.setItem("Questions", JSON.stringify(data));
    dispatch({ type: "GET_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = (questionId) => async (dispatch) => {
  try {
    const data = await api.getQuestion(questionId);
    let wrapper = data.data;
    async function fetchImage(question) {
      const image = await api.getImage(question.image.id);
      let base64ImageString = Buffer.from(image.data, "binary").toString(
        "base64"
      );
      return "data:" + question.image.type + ";base64," + base64ImageString;
    }
    if (wrapper.question.image !== null) {
      await fetchImage(wrapper.question).then((data) => (wrapper.question.image.imageData = data));
    }
    localStorage.setItem("Question", JSON.stringify(wrapper))
    dispatch({ type: "GET_QUESTION", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredQuestions = (filters) => async (dispatch) => {
  try {
    const { questions } = await api.getAllQuestions();
    // TODO fix
    console.log(questions);
    const titleMatch = questions.filter((question) =>
      question.title.toLowerCase().includes(filters.title.toLowerCase())
    );
    const usernameMatch = questions.filter(
      (question) => question.user.username === filters.username
    );
    const tagMatch = questions.filter((question) =>
      question.tags.some((tag) =>
        tag.toLowerCase().includes(filters.tag.toLowerCase())
      )
    );
    dispatch({
      type: "GET_FILTERED_QUESTIONS",
      payload: { titleMatch, usernameMatch, tagMatch },
    });
  } catch (error) {
    console.log(error);
  }
};

export const postQuestion =
  (questionData, userToken, navigate) => async (dispatch) => {
    try {
      const image = await api.postImage(questionData.image, userToken);
      questionData.image = image.data;
      const { data } = await api.postQuestion(questionData, userToken);
      dispatch({ type: "POST_QUESTION", payload: data });
      dispatch(getAllQuestions());
      navigate(`/questions/${data.question.id}`);
    } catch (error) {
      console.log(error);
    }
  };

export const updateQuestion =
  (questionData, userToken, navigate) => async (dispatch) => {
    try {
      const image = await api.postImage(questionData.image, userToken);
      questionData.image = image.data;
      const data = await api.updateQuestion(questionData, userToken);
      dispatch({ type: "UPDATE_QUESTION", payload: data });
      dispatch(getAllQuestions());
      navigate(`/questions/${questionData.question.id}`);
    } catch (error) {
      console.log(error);
    }
  };

export const updateQuestionVotes =
  (questionData, userToken, navigate) => async (dispatch) => {
    try {
      const { data } = await api.updateQuestionVotes(questionData, userToken);
      dispatch({ type: "UPDATE_QUESTION_VOTES", payload: data });
      dispatch(getAllQuestions());
      navigate(`/questions/${questionData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteQuestion =
  (questionId, userToken, navigate) => async (dispatch) => {
    try {
      await api.deleteQuestion(questionId, userToken);
      dispatch({ type: "DELETE_QUESTION", payload: null });
      dispatch(getAllQuestions());
      navigate("/questions");
    } catch (error) {
      console.log(error);
    }
  };
