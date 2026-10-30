import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, TrendingUp } from "lucide-react";
import moment from "moment";

const FlashcardSetCard = ({ flashcardSet }) => {
  const navigate = useNavigate();

  const handleCard = () => {
    navigate(`/documents/${flashcardSet.documentId._id}/flashcards`);
  };

  const reviewedCount = flashcardSet.cards.filter(
    (card) => card.lastReviewed
  ).length;

  const totalCards = flashcardSet.cards.length;

  const progress =
    totalCards > 0
      ? Math.round((reviewedCount / totalCards) * 100)
      : 0;

  return (
    <div
      onClick={handleCard}
      className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer border border-gray-300 hover:border-emerald-400"
    >
      {/* Title */}
      <div className="flex items-center gap-2 text-gray-800 font-semibold">
        <BookOpen size={18} />
        {flashcardSet.documentId.title || "Untitled"}
      </div>

      {/* Created Time */}
      <p className="text-xs text-gray-400 mt-1">
        CREATED {moment(flashcardSet.createdAt).fromNow().toUpperCase()}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-3 mt-4">
        <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-600 ">
          {totalCards} Cards
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
          <TrendingUp size={14} />
          {progress}%
        </span>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>
            {reviewedCount}/{totalCards} reviewed
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-green-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleCard();
        }}
        className="w-full mt-5 bg-emerald-200 text-green-900 py-2 rounded-xl font-medium hover:bg-green-200 transition border border-emerald-200 hover:border-emerald-400"
      >
        ✨ Study Now
      </button>
    </div>
  );
};

export default FlashcardSetCard;