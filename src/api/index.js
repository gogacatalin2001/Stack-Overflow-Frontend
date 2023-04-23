import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// UNAUTHENTICATED REQUESTS
export const logIn = (authData) => API.post("/auth/login", authData);
export const signUp = (authData) => API.post("/auth/register", authData);

// AUTHENTICATED REQUESTS

export const getAllQuestions = (userToken) => API.get("/questions/all");

export const postQuestion = (questionData, userToken) =>
  API.post(`/questions?user_id=${questionData.userId}`, questionData, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });

export const deleteQuestion = (questionId, userToken) =>
  API.delete(`/questions?question_id=${questionId}`, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });

export const postAnswer = (questionId, userId, answerText, userToken) =>
  API.post(
    `/answers?question_id=${questionId}&user_id=${userId}`,
    { text: answerText },
    {
      headers: {
        Authorization: userToken,
      },
      withCredentials: true,
    }
  );

export const deleteAnswer = (questionId, answerId, userToken) =>
  API.delete(`/answers?question_id=${questionId}&answer_id=${answerId}`, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });
