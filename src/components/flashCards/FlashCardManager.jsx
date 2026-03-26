import React, { useState, useEffect } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Sparkles,
  BrainCircuit,
  Brain,
} from "lucide-react";
import flashcardBg from "../../assets/flashcardBg.png";
import toast from "react-hot-toast";
import moment from "moment";
import aiService from "../../services/aiService";
import flashcardService from "../../services/flashcardService.js";
import Spinner from "../common/Spinner";
import Flashcard from "./Flashcard";
import Modal from "../common/Modal";

const FlashCardManager = ({ documentId }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [currentCardindex, setCurrentCardIndex] = useState(0);
  const [isDeleteModelOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [setToDelete, setSetToDelete] = useState(null);

  const fetchFlashcardSet = async () => {
    setLoading(true);
    try {
      const response =
        await flashcardService.getFlashCardsForDocuments(documentId);
      setFlashcards(response);
      console.log(response);
    } catch {
      toast.error("Failed to fetch flashcards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcardSet();
  }, [documentId]);

  const handleGenerateFlashcards = async () => {
    setGenerating(true);
    try {
      await aiService.generateFlashcards(documentId);
      toast.success("Flashcards generated successfully");
      fetchFlashcardSet();
    } catch {
      toast.error("Failed to generate flashcards");
    } finally {
      setGenerating(false);
    }
  };

  const cards = selectedSet?.cards || selectedSet?.flashcards || [];

  const handleNextCard = () => {
    handleReview(currentCardindex);
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevCard = () => {
    handleReview(currentCardindex);
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleReview = async (cardIndex) => {
    const card = cards[cardIndex];
    if (!card) return;
    try {
      await flashcardService.reviewFlashcard(card._id, { cardIndex });
    } catch {
      toast.error("Failed to review flashcard");
    }
  };

  const handleToggleStar = async (cardId) => {
    try {
      await flashcardService.toggleStar(cardId);

      setFlashcards((prevSets) =>
        prevSets.map((set) => {
          if (set._id !== selectedSet._id) return set;

          const updatedSet = {
            ...set,
            cards: set.cards.map((card) =>
              card._id === cardId
                ? { ...card, isStarred: !card.isStarred }
                : card,
            ),
          };

          setSelectedSet(updatedSet);
          return updatedSet;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRequest = (e, set) => {
    e.stopPropagation();
    setSetToDelete(set);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await flashcardService.deleteFlashcardSet(setToDelete._id);
      toast.success("Deleted successfully");
      fetchFlashcardSet();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSelectSet = (set) => {
    setSelectedSet(set);
    setCurrentCardIndex(0);
  };

  /* ---------------- FLASHCARD VIEWER ---------------- */

  const renderFlashcardViewer = () => {
    const card = cards[currentCardindex];

    return (
      <>
        {" "}
        <button
          onClick={() => setSelectedSet(null)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition"
        >
          ← Back
        </button>
        <div className=" p-4 md:p-8 flex flex-col items-center justify-center bg-gray-50">
          <Flashcard card={card} onToggleStar={handleToggleStar} />

          <div className="flex items-center gap-4 mt-6">
            <button onClick={handlePrevCard} className="navBtn">
              <ChevronLeft />
            </button>

            <span className="text-sm text-gray-800 bg-gray-100 rounded-md px-3 py-1 border-1 border-gray-300 ">
              {currentCardindex + 1} / {cards.length}
            </span>

            <button onClick={handleNextCard} className="navBtn">
              <ChevronRight />
            </button>
          </div>
        </div>
      </>
    );
  };

  /* ---------------- SET LIST ---------------- */

  const renderSetList = () => {
    if (loading)
      return (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      );

    if (flashcards.length === 0) {
      return (
        <div
          className="flex flex-col items-center justify-center text-center min-h-screen bg-cover bg-center px-4"
          style={{ backgroundImage: `url(${flashcardBg})` }}
        >
          <div className="space-y-3 bg-white/80 backdrop-blur p-6 rounded-xl shadow-xl max-w-sm w-full">
            <div className="bg-emerald-200 inline-flex p-3 rounded-2xl">
              <Brain className="w-8 h-8 text-emerald-700" />
            </div>

            <h3 className="text-lg font-semibold uppercase">
              No Flashcards yet
            </h3>

            <p className="text-gray-500 text-sm">
              Generate flashcards from your document
            </p>

            <button
              onClick={handleGenerateFlashcards}
              disabled={generating}
              className="primaryBtn w-full"
            >
              {generating ? (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="animate-spin" />
                  generating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles />
                  Generate Flashcard
                </span>
              )}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-2 md:p-8 space-y-6 h-screen">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow">
          <div>
            <h2 className="text-xl font-semibold  text-gray-600 font-serif">
              Your Flashcards Sets
            </h2>
            <p className="text-gray-500 text-sm">
              {flashcards.length} sets available
            </p>
          </div>

          <button
            onClick={handleGenerateFlashcards}
            disabled={generating}
            className="primaryBtn "
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="animate-spin" />
                generating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles />
                Generate Flashcard
              </span>
            )}
          </button>
        </div>

        {/* grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flashcards.map((set) => (
            <div
              key={set._id}
              onClick={() => handleSelectSet(set)}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer border-gray-300 hover:border-emerald-300 border-2"
            >
              <div className="flex justify-between items-center">
                <div className="bg-emerald-100 p-2 rounded-md">
                  <BrainCircuit size={18} className="text-emerald-600" />
                </div>
                <Trash2
                  onClick={(e) => handleDeleteRequest(e, set)}
                  className="text-red-500 hover:scale-110"
                />
              </div>

              <h3 className="font-semibold mt-3">Flashcard Set</h3>

              <p className="text-sm text-gray-500">
                {moment(set.createdAt).fromNow()}
              </p>
              <div className="bg-emerald-100 inline-block px-2 py-1 mt-4 text-green-800 font-mono rounded-md">
                <span>{set.cards.length} cards</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {selectedSet ? renderFlashcardViewer() : renderSetList()}

      <Modal
        isOpen={isDeleteModelOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Flashcard Set"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this set?</p>
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default FlashCardManager;
