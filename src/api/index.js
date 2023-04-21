import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// UNAUTHENTICATED REQUESTS
export const logIn = (authData) => API.post("/auth/login", authData);
export const signUp = (authData) => API.post("/auth/register", authData);

// AUTHENTICATED REQUESTS
export const userToken = `Bearer ${
  JSON.parse(localStorage.getItem("User")).token
}`;

export const getAllQuestions = () =>
  API.get("/questions/all", {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });

export const getQuestion = (questionId) =>
  API.get(`/questions?question_id=${questionId}`, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });

export const postQuestion = (questionData) =>
  API.post(`/questions?user_id=${questionData.userId}`, questionData, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });

export const postAnswer = (answerData) => API.post("/answers", answerData);
