import React from "react";
import { useParams } from "react-router-dom";
import FlashCardManager from "../../components/flashCards/FlashCardManager";
import { BookOpen } from "lucide-react";

const FlashCardPage = () => {
  const { id } = useParams(); // ✅ params se id le li

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex items-center gap-3">
        <div className="bg-emerald-100 p-3 rounded-xl">
          <BookOpen className="text-emerald-600" />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Flashcards
          </h1>
          <p className="text-sm text-gray-500">
            Learn and revise your concepts
          </p>
        </div>
      </div>

      {/* Flashcard Manager */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <FlashCardManager documentId={id} />
      </div>
    </div>
  );
};

export default FlashCardPage;