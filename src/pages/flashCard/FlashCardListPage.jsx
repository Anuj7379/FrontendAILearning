import React, { useEffect, useState } from "react";
import flashcardService from "../../services/flashCardService.js";
import PageHeader from "../../components/common/PageHeader.jsx";
import Spinner from "../../components/common/Spinner.jsx";
import FlashcardSetCard from "../../components/flashCards/FlashcardSetCard.jsx";
import toast from "react-hot-toast";

const FlashCardListPage = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashCardSets = async () => {
      try {
        const res = await flashcardService.getAllFlashCardSets();
        console.log("fetching flashcards sets!", res);
        setFlashcardSets(res);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch flashcards");
      } finally {
        setLoading(false);
      }
    };

    fetchFlashCardSets();
  }, []); 

  const renderContent = () => {
    if (loading) {
      return <Spinner />;
    }

    if (flashcardSets.length === 0) {
      return (
        <div className="text-center mt-10">
          <h1 className="text-xl font-semibold">
            No Flashcards are generated yet.
          </h1>
          <p className="text-gray-500">
            Please go to Document to generate flashcards!
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mt-6">
        {flashcardSets.map((set) => (
          <FlashcardSetCard key={set._id} flashcardSet={set} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <PageHeader title=" All Flashcards Sets !" />
      {renderContent()}
    </div>
  );
};

export default FlashCardListPage;