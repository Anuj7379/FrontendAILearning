import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import QuizCard from "./QuizCard";
import quizService from "../../services/quizService";
import aiService from "../../services/aiService";

import { Plus, Trash2 } from "lucide-react";
import Spinner from "../common/Spinner";
import Modal from "../common/Modal";
import Button from "../common/Button";
import toast from "react-hot-toast";
import EmptyState from '../common/EmptyState'

const QuizManager = ({ documentId }) => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [isGenerateModelOpen, setIsGenerateModelOpen] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  //  Fetch Quizzes
  const fetchQuizzes = async () => {
    try {
      setLoading(true);

      const res = await quizService.getQuizzesForDocument(documentId);

      //  adjust according to your backend response
      setQuizzes(res || []);
      console.log("Quizz :" , res)
    } catch (error) {
      toast.error("Quiz not fetched !");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (documentId) fetchQuizzes();
  }, [documentId]);

  // Generate Quiz
  const handleGenerateQuizzes = async (e) => {
    e.preventDefault();

    try {
      setGenerating(true);

      await aiService.generateQuiz(documentId, {
        numOfQuestions: Number(numQuestions),
      });

      toast.success("Quiz generated Successfully !");
      setIsGenerateModelOpen(false);
      fetchQuizzes();
    } catch (error) {
      toast.error("Quiz not Generated !");
    } finally {
      setGenerating(false);
    }
  };

  //  Delete Quiz
  const handleDeleteQuizRequest = (quiz) => {
    setSelectedQuiz(quiz);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);

      await quizService.deleteQuiz(selectedQuiz._id);

      toast.success("Quiz deleted successfully");
      setIsDeleteModalOpen(false);
      fetchQuizzes();
    } catch {
      toast.error("Failed to delete quiz");
    } finally {
      setDeleting(false);
    }
  };

  //  Render Content
  const renderQuizContent = () => {
    if (loading) return <Spinner />;

    if (!quizzes.length)
      return (
      <EmptyState setIsGenerateModelOpen ={setIsGenerateModelOpen}/>
      );

    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz._id}
            quiz={quiz}
            onDelete={() => handleDeleteQuizRequest(quiz)}
            onAttempt={() => navigate(`/quiz/${quiz._id}`)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quizzes</h2>

        <Button onClick={() => setIsGenerateModelOpen(true)}>
          <Plus size={18} className="mr-1" />
          Generate Quiz
        </Button>
      </div>

      {renderQuizContent()}

      {/* Generate Modal */}
      <Modal
        isOpen={isGenerateModelOpen}
        onClose={() => setIsGenerateModelOpen(false)}
        title="Generate Quiz"
      >
        <form onSubmit={handleGenerateQuizzes} className="space-y-4">
          <input
            type="number"
            min={1}
            max={20}
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <Button type="submit" loading={generating} className="w-full">
            Generate
          </Button>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Quiz"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this quiz?</p>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={confirmDelete}
              loading={deleting}
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default QuizManager;