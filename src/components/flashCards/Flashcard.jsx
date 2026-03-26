import React, { useState, useEffect } from "react";
import { Star, RotateCcw } from "lucide-react";

const Flashcard = ({ card, onToggleStar }) => {
  const [flipped, setFlipped] = useState(false);

  // reset when card changes
  useEffect(() => {
    setFlipped(false);
  }, [card]);

  // keyboard support → space to flip
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        setFlipped((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!card) return null;

  const handleStarClick = (e) => {
    e.stopPropagation(); // ❗ prevent flip
    onToggleStar(card._id);
  };

  const handleResetFlip = (e) => {
    e.stopPropagation();
    setFlipped(false);
  };

  return (
    <div
      className="w-full max-w-2xl h-72 md:h-80 perspective cursor-pointer"
      onClick={() => setFlipped((prev) => !prev)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* ⭐ STAR BUTTON */}

        <button
          onClick={handleStarClick}
          className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Star
            className={`w-5 h-5 ${
              card.isStarred
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400"
            }`}
          />
        </button>

        {/* 🔄 RESET FLIP BUTTON */}
        {flipped && (
          <button
            onClick={handleResetFlip}
            className="absolute top-3 left-3 z-20 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
          >
            <RotateCcw className="w-4 h-4 text-emerald-600" />
          </button>
        )}

        {/* FRONT — QUESTION */}

        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl border-2 border-gray-200 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-sm text-emerald-500 mb-2">Question</p>

          <div className="overflow-y-auto">
            <h2 className="text-md md:text-2xl font-semibold text-gray-800 font-serif">
              {card.question}
            </h2>
          </div>
          <span className="text-black absolute left-0 top-0 bg-gray-100 border-1 border-gray-300 rounded-md uppercase text-sm px-3 py-1 m-2">
            {card.difficulty}
          </span>

          <span className="absolute bottom-4 text-xs text-gray-400">
            Click / Press Space to flip
          </span>
        </div>

        {/* BACK — ANSWER */}
        <div
          className="absolute inset-0 rotate-y-180 backface-hidden bg-gradient-to-r from-emerald-500  to-teal-700
       text-white rounded-2xl shadow-2xl shadow-amber-100 flex flex-col items-center justify-center p-6 text-center"
        >
          <p className="text-sm mb-2 opacity-80">Answer</p>

          <div className="overflow-y-auto">
            <h2 className="text-md md:text-xl font-semibold font-serif">{card.answer}</h2>
          </div>

          <span className="absolute bottom-4 text-xs opacity-80">
            Click / Press Space to flip
          </span>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
