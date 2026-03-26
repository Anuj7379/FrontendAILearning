import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle, Dot } from "lucide-react";
import quizService from "../../services/quizService";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";
import Button from "../../components/common/Button";

const QuizzesTakePage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currQnIndex, setCurrQnIndex] = useState(0);
  const [selectAns, setSelectedAns] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await quizService.getQuizById(quizId);
        console.log("Yourr quizzzz", response);
        setQuiz(response);
      } catch {
        toast.error("Failed to fetch quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Select answer
  const handleOptionChange = (questionId, optionIndex) => {
    setSelectedAns((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Navigation
  const handleNextQuestion = () => {
    if (currQnIndex < quiz.questions.length - 1) {
      setCurrQnIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQn = () => {
    if (currQnIndex > 0) {
      setCurrQnIndex((prev) => prev - 1);
    }
  };

  // Submit
const handleSubmitQuiz = async () => {
  setSubmitting(true);

  try {
    const formattedAnswer = Object.keys(selectAns).map((questionId) => {
      const QnIndex = quiz.questions.findIndex(
        (q) => q._id === questionId
      );

      const qn = quiz.questions[QnIndex];
      const optionIndex = selectAns[questionId];
      const selectedAnswer = qn.options[optionIndex];

      return { questionIndex: QnIndex, selectedAnswer };
    });

    await quizService.submitQuiz(quizId, formattedAnswer);

    toast.success("Quiz submitted!");
    navigate(`/quiz/${quizId}/results`);
  } catch(err) {
    toast.error("Submit failed");
    console.log(err)
  } finally {
    setSubmitting(false);
  }
};

  // Loading
  if (loading) return <Spinner />;

  // No quiz
  if (!quiz || quiz.questions.length === 0) {
    return <p className="text-center mt-10">Quiz not found</p>;
  }

  const currentQuestion = quiz.questions[currQnIndex];
  const isAnswered = selectAns.hasOwnProperty(currentQuestion._id);
  const answerCount = Object.keys(selectAns).length;

  return (
    <div className="mx-2 md:mx-4 p-4 space-y-6">
      <div className="text-2xl font-serif">{quiz.title}</div>
      {/* Answer Count */}
      <div className="w-full mt-4 space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>
            {Math.round((answerCount / quiz.questions.length) * 100)}%
          </span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{
              width: `${(answerCount / quiz.questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="border-2 border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center  text-sm font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-xl w-fit border-emerald-300 border mb-4">
          <Dot size={30} />

          <span>
            Question {currQnIndex + 1} / {quiz.questions.length}
          </span>
        </div>
        <h2 className="text-lg font-semibold mb-4">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt, index) => (
            <label
              key={index}
              className={`block border-2 border-gray-200 p-3 rounded-lg cursor-pointer transition 
              ${
                selectAns[currentQuestion._id] === index
                  ? "bg-emerald-100 border-emerald-300"
                  : "hover:bg-emerald-200"
              }`}
            >
              <input
                type="radio"
                name={currentQuestion._id}
                checked={selectAns[currentQuestion._id] === index}
                onChange={() => handleOptionChange(currentQuestion._id, index)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button onClick={handlePreviousQn} disabled={currQnIndex === 0}>
          <ChevronLeft size={16} /> Prev
        </Button>

        {currQnIndex === quiz.questions.length - 1 ? (
          <Button
            onClick={handleSubmitQuiz}
            loading={submitting}
            disabled={answerCount !== quiz.questions.length}
          >
            <CheckCircle size={16} /> Submit
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            Next <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizzesTakePage;
