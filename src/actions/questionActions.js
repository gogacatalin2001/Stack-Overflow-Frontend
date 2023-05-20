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
      await fetchImage(wrapper.question).then(
        (data) => (wrapper.question.image.imageData = data)
      );
    }
    localStorage.setItem("Question", JSON.stringify(wrapper));
    dispatch({ type: "GET_QUESTION", payload: wrapper });
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredQuestions = (filters) => async (dispatch) => {
  try {
    const { questions } = await api.getAllQuestions();
    const titleMatch = questions.filter((question) =>
      question.title.toLowerCase().includes(filters.text.toLowerCase())
    );
    const usernameMatch = questions.filter(
      (question) => question.user.username === filters.username
    );
    const tagMatch = questions.filter((question) =>
      question.tags.some((tag) =>
        tag.toLowerCase().includes(filters.tag.toLowerCase())
      )
    );
    console.log(questions);
    console.log(titleMatch);
    console.log(usernameMatch);
    console.log(tagMatch);

    // dispatch({
    //   type: "GET_FILTERED_QUESTIONS",
    //   payload: { titleMatch, usernameMatch, tagMatch },
    // });
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
      await dispatch(getAllQuestions());
      dispatch({ type: "POST_QUESTION", payload: data });
      navigate(`/questions/${data.question.id}`);
    } catch (error) {
      console.log(error);
    }
  };

export const updateQuestion =
  (questionData, userToken, navigate) => async (dispatch) => {
    try {
      if (questionData.image !== null) {
        const image = await api.postImage(questionData.image, userToken);
        questionData.image = image.data;
        console.log(image.data);
      } else if (questionData.question.image === null) {
        questionData.image = "-1";
      } else {
        questionData.image = questionData.question.image.id
        questionData.question.image = null
      }
      console.log(questionData)
      const data = await api.updateQuestion(questionData, userToken);
      await dispatch(getAllQuestions());
      dispatch({ type: "UPDATE_QUESTION", payload: data });
      navigate(`/questions/${questionData.question.id}`);
    } catch (error) {
      console.log(error);
    }
  };

export const updateQuestionVotes =
  (questionData, userToken, navigate) => async (dispatch) => {
    try {
      const { data } = await api.updateQuestionVotes(questionData, userToken);
      await dispatch(getAllQuestions());
      dispatch({ type: "UPDATE_QUESTION_VOTES", payload: data });
      navigate(`/questions/${questionData.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteQuestion =
  (questionId, userToken, navigate) => async (dispatch) => {
    try {
      await api.deleteQuestion(questionId, userToken);
      await dispatch(getAllQuestions());
      dispatch({ type: "DELETE_QUESTION", payload: null });
      navigate("/questions");
    } catch (error) {
      console.log(error);
    }
  };
