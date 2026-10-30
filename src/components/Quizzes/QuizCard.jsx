import React from "react";
import { Trash2, PlayCircle, CheckCircle , BarChartHorizontal } from "lucide-react";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz, onDelete, onAttempt }) => {
  const isCompleted = quiz.completedAt;

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-4">
      {/* 📊 Top */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">
          {quiz.documentId?.title || "Quiz"}
        </h3>

        {isCompleted ? (
          <span className="text-green-600 flex items-center gap-1 text-sm">
            <CheckCircle size={16} />
            Completed
          </span>
        ) : (
          <span className="text-yellow-600 text-sm">Pending</span>
        )}
      </div>

      {/* 📌 Info */}
      <div className="flex gap-3">
        <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
          Questions: {quiz.totalQuestions}
        </div>

        {isCompleted && (
          <div className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
            Score: {quiz.score}/{quiz.totalQuestions}
          </div>
        )}
      </div>

      {/* 🎯 Actions */}
      <div className="flex justify-between gap-2 pt-2">
        {!isCompleted && (
          <Button
            onClick={() => onAttempt(quiz)}
            className="flex-1 flex items-center justify-center gap-1"
          >
            <PlayCircle size={18} />
            Attempt
          </Button>
        )}
        {isCompleted && (
          <Link to={`/quiz/${quiz._id}/results`}>
            <Button
          
            className="flex-1 flex items-center justify-center gap-1"
          >
            <BarChartHorizontal size={18} />
            View Result
          </Button>
          </Link>
        )}

        <Button
          variant="danger"
          onClick={onDelete}
          className="flex items-center justify-center"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
