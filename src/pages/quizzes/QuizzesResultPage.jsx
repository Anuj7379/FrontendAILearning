import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import quizService from "../../services/quizService";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from "lucide-react";

const QuizzesResultPage = () => {
  const { quizId } = useParams();

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch Results
  useEffect(() => {
    const fetchedResults = async () => {
      try {
        const data = await quizService.getQuizById(quizId);
        console.log("Results:", data);
        setResults(data);
      } catch {
        toast.error("Quiz not fetched");
      } finally {
        setLoading(false);
      }
    };

    fetchedResults();
  }, [quizId]);

  // ⏳ Loading
  if (loading) return <Spinner />;

  // ❌ No Data
  if (!results) {
    return <p className="text-center mt-10">No Results Found</p>;
  }

  // 📊 Calculations
  const total = results.totalQuestions;
  const correct = results.score;
  const incorrect = total - correct;
  const score = Math.round((correct / total) * 100);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      {/* 🔙 Back Button */}
      <Link
        to="/documents"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      {/* 🏆 Score Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-emerald-100 p-3 rounded-full">
            <Trophy className="text-emerald-600" />
          </div>
        </div>

        <p className="text-gray-500 text-sm">YOUR SCORE</p>

        <h1 className="text-4xl font-bold text-orange-500">{score}%</h1>

        <p className="text-gray-600">
          {score >= 70 ? "Great job!" : "Not bad!"}
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-3 flex-wrap">
          <div className="px-3 py-1 bg-gray-100 rounded-xl text-sm border-gray-400 border-2">
            {total} Total
          </div>

          <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-xl text-sm border-emerald-400 border-2">
            {correct} Correct
          </div>

          <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm border-red-400 border-2">
            {incorrect} Incorrect
          </div>
        </div>
      </div>

      {/* 📊 Detailed Review */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Detailed Review</h2>

        {results.questions.map((q, index) => {
          // ✅ Get user answer from array
          const userAnswer = results.userAnswers[index]?.selectedAnswer;

          return (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-4 space-y-3"
            >
              {/* Question */}
              <p className="font-medium">
                {index + 1}. {q.question}
              </p>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isCorrect = opt === q.correctAnswer;
                  const isUser = opt === userAnswer;

                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-lg border border-gray-300 text-sm flex justify-between items-center
                        ${
                          isCorrect
                            ? "bg-emerald-100 border-emerald-300"
                            : isUser
                              ? "bg-red-100 border-red-300"
                              : "bg-gray-50"
                        }
                      `}
                    >
                      <span>{opt}</span>

                      {/* Correct */}
                      {isCorrect && (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={14} /> Correct
                        </span>
                      )}

                      {/* Wrong */}
                      {isUser && !isCorrect && (
                        <span className="text-red-500 flex items-center gap-1">
                          <XCircle size={14} /> Your Answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 🧠 Explanation (Optional) */}
              {q.explanation && (
                <div className="bg-gray-100 border border-gray-400 p-4 rounded-xl text-sm text-gray-700 shadow-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 text-lg">💡</span>

                    <div>
                      <p className="font-semibold text-gray-800">Explanation</p>
                      <p className="mt-1 text-gray-600 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizzesResultPage;
