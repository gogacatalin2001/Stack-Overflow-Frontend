import axios from "axios";

const API_NO_CREDENTIALS = axios.create({
  baseURL: "http://localhost:8080"
});

const API_CREDENTIALS = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

export const logIn = (authData) => API_NO_CREDENTIALS.post("/auth/login", authData);
export const signUp = (authData) => API_NO_CREDENTIALS.post("/auth/register", authData);
export const postQuestion = (questionData) =>
  API_CREDENTIALS.post("/questions",
  {
    data: questionData.data,
    params: { user_id: questionData.userId },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("User")).token}`,
    },
  });

export const postAnswer = (answerData) => API_CREDENTIALS.post("/answers", answerData);
