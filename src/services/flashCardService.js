import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

// Get all flashcard sets
const getAllFlashCardSets = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.FLASHCARDS.GET_ALL_FLASHCARD_SETS
    );
    return response.data?.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch flashcard sets" };
  }
};

//  Get flashcards for a specific document
const getFlashCardsForDocuments = async (docId) => {
  try {
    const res = await axiosInstance.get(
      API_PATHS.FLASHCARDS.GET_FLASHCARDS_SET_FOR_DOC(docId)
    );
    return res.data?.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch flashcards" };
  }
};

//  Review flashcard
const reviewFlashcard = async (cardId, cardIndex) => {
  try {
    const res = await axiosInstance.put(
      API_PATHS.FLASHCARDS.REVIEW_FLASHCARD(cardId),
      { cardIndex }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to review flashcard" };
  }
};

//  Toggle star / started
const toggleStar = async (cardId) => {
  try {
    const res = await axiosInstance.put(
      API_PATHS.FLASHCARDS.TOGGLE_STARTED(cardId)
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to toggle star" };
  }
};

//  Delete flashcard set
const deleteFlashcardSet = async (id) => {
  try {
    const res = await axiosInstance.delete(
      API_PATHS.FLASHCARDS.DELETE_FLASHCARD_SET(id)
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete flashcard set" };
  }
};

const flashcardService  = {
  getAllFlashCardSets,
  getFlashCardsForDocuments,
  reviewFlashcard,
  toggleStar,
  deleteFlashcardSet,
};

export default flashcardService ;
