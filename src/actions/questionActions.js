import * as api from "../api";

export const getAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    localStorage.setItem("Questions", JSON.stringify(data));
    dispatch({ type: "GET_ALL_QUESTIONS", payload: data });
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
