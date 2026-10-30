import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

//  Get quizzes for a specific document
const getQuizzesForDocument = async (documentId) => {
  try {
    const res = await axiosInstance.get(
      API_PATHS.QUIZ.GET_QUIZZES_FOR_DOC(documentId)
    );
    return res.data?.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch quizzes" };
  }
};

//  Get quiz by ID
const getQuizById = async (quizId) => {
  try {
    const res = await axiosInstance.get(
      API_PATHS.QUIZ.GET_QUIZ_BY_ID(quizId)
    );
    return res.data?.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch quiz" };
  }
};

//  Submit quiz
const submitQuiz = async (quizId, answers) => {
  try {
    const res = await axiosInstance.post(
      API_PATHS.QUIZ.SUBMIT_QUIZ(quizId),
      { answers }
    );
    return res.data?.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to submit quiz" };
  }
};

//  Get quiz result
const getQuizResult = async (quizId) => {
  try {
    const res = await axiosInstance.get(
      API_PATHS.QUIZ.GET_QUIZ_RESULTS(quizId)
    );
    return res.data?.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch quiz result" };
  }
};

//  Delete quiz
const deleteQuiz = async (quizId) => {
  try {
    const res = await axiosInstance.delete(
      API_PATHS.QUIZ.DELETE_QUIZ(quizId)
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete quiz" };
  }
};

const quizService = {
  getQuizzesForDocument,
  getQuizById,
  submitQuiz,
  getQuizResult,
  deleteQuiz,
};

export default quizService;
