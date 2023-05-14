import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080",
});

// UNAUTHENTICATED REQUESTS
export const logIn = (authData) => API.post("/auth/login", authData);
export const signUp = (authData) => API.post("/auth/register", authData);

// AUTHENTICATED REQUESTS

// TODO implemnt save image
export const postImage = (imageData, userToken) =>
  API.post(`/images?image=${imageData}`, {
    headers: {
      Authorization: userToken,
      "content-type": "multipart/form-data",
    },
    withCredentials: true,
  });

export const getAllQuestions = () => API.get("/questions/all");

export const postQuestion = (questionData, userToken) =>
  API.post(`/questions?user_id=${questionData.userId}`, questionData, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });

export const updateQuestion = (questionData, userToken) =>
  API.put(
    `/questions?question_id=${questionData.question.id}&image_id=${questionData.imageId}&user_id=${questionData.question.user.userId}`,
    { question: questionData.question, tags: questionData.tags },
    {
      headers: {
        Authorization: userToken,
      },
      withCredentials: true,
    }
  );

export const updateQuestionVotes = (questionData, userToken) =>
  API.patch(
    `/questions/votes?question_id=${questionData.questionId}&user_id=${questionData.userId}&vote=${questionData.vote}`,
    {},
    {
      headers: {
        Authorization: userToken,
      },
      withCredentials: true,
    }
  );

export const deleteQuestion = (questionId, userToken) =>
  API.delete(`/questions?question_id=${questionId}`, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });

export const postAnswer = (answerData, userToken) =>
  API.post(
    `/answers?question_id=${answerData.questionId}&image_id=${answerData.imageId}&user_id=${answerData.userId}`,
    { text: answerData.answerText },
    {
      headers: {
        Authorization: userToken,
      },
      withCredentials: true,
    }
  );

export const updateAnswer = (answerData, userToken) => {
  API.put(
    `/answers?question_id=${answerData.questionId}&answer_id=${answerData.answer.id}&image_id=${answerData.imageId}&user_id=${answerData.userId}`,
    answerData.answer,
    {
      headers: {
        Authorization: userToken,
      },
      withCredentials: true,
    }
  );
};

export const updateAnswerVotes = (answerData, userToken) =>
  API.patch(
    `/answers/votes?question_id=${answerData.questionId}&answer_id=${answerData.answerId}&user_id=${answerData.userId}&vote=${answerData.vote}`,
    {},
    {
      headers: {
        Authorization: userToken,
      },
      withCredentials: true,
    }
  );

export const deleteAnswer = (answerData, userToken) =>
  API.delete(
    `/answers?question_id=${answerData.questionId}&answer_id=${answerData.answerId}&user_id=${answerData.userId}`,
    {
      headers: {
        Authorization: userToken,
      },
      withCredentials: true,
    }
  );

export const getAllTags = () => API.get("/tags/all");

export const getAllUsers = () => API.get("/users/all");

export const updateUser = (userData, userToken) =>
  API.put(
    `/users?user_id=${userData.userId}`,
    userData,
    {
      headers: {
        Authorization: userToken,
      },
      withCredentials: true,
    }
  );
