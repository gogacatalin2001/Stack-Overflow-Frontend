import axios from "axios";

// TODO only let a user vote once for a question/answer

export const API = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// UNAUTHENTICATED REQUESTS
export const logIn = (authData) => API.post("/auth/login", authData);
export const signUp = (authData) => API.post("/auth/register", authData);

// AUTHENTICATED REQUESTS

export const getAllQuestions = () => API.get("/questions/all");

export const postQuestion = (questionData, userToken) =>
  API.post(`/questions?user_id=${questionData.userId}`, questionData, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });

export const updateQuestion = (questionData, userToken) => {
  // TODO implement
};

export const updateQuestionVotes = (questionData, userToken) => {
  // questionData : {
  //   questionId,
  //   userId,
  //   vote
  // }

  API.patch(`/questions/votes?question_id=${questionData.questionId}&user_id=${questionData.userId}&vote=${questionData.vote}`, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });

  // if (vote === -1) => updateUserScore(userId, -1.5)
};

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

export const updateAnswer = (answerData, userToken) => {
  // TODO implement
};

export const updateAnswerVotes = (answerData, userToken) => {
  // answerData: {
  //   questionId,
  //   answerId,
  //   userId,
  //   vote
  // }
  
  // TODO implement

  // if (vote === -1) => updateUserScore(userId, -1.5)
};

export const deleteAnswer = (questionId, answerId, userToken) =>
  API.delete(`/answers?question_id=${questionId}&answer_id=${answerId}`, {
    headers: {
      Authorization: userToken,
    },
    withCredentials: true,
  });
