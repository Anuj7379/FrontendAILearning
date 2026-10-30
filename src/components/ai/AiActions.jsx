import React from "react";
import { useParams } from "react-router-dom";
import { Sparkles, BookOpen, Lightbulb } from "lucide-react";
import aiService from "../../services/aiService";
import toast from "react-hot-toast";
import MarkdownRender from "../common/MarkdownRender";
import Modal from "../common/Modal";

const AiActions = () => {
  const { id: documentId } = useParams();

  const [loading, setLoading] = React.useState(false);
  const [loadingAction, setLoadingAction] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");
  const [modalTitle, setModalTitle] = React.useState("");
  const [concept, setConcept] = React.useState("");

  /* ---------------- SUMMARY ---------------- */

  const handleGenerateSummary = async () => {
    setLoadingAction("summary");
    setLoading(true);

    try {
      const response = await aiService.generateSummary(documentId);

      setModalTitle("Document Summary");
      setModalContent(response.summary);
      console.log("Summary response:", response);
      setIsModalOpen(true);
    } catch (err) {
      toast.error("Failed to generate summary");
    } finally {
      setLoading(false);
      setLoadingAction(null);
    }
  };

  /* ---------------- EXPLAIN ---------------- */

  const handleExplainConcept = async () => {
    if (!concept.trim()) {
      toast.error("Please enter a concept to explain");
      return;
    }

    setLoadingAction("explain");
    setLoading(true);

    try {
      const response = await aiService.explainConcept(documentId, concept);
      console.log("Explain response:", response);

      setModalTitle(`Explanation of "${concept}"`);
      setModalContent(response.data.explanation);
      setIsModalOpen(true);
    } catch (err) {
      toast.error("Failed to explain concept");
    } finally {
      setLoading(false);
      setLoadingAction(null);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <div className="bg-white rounded-xl border-2 border-gray-100  p-5 shadow-sm h-screen">
        {/* Header */}
        <div className="flex flex-col  mb-5 border-b-2 border-gray-200 pb-3">
          <div className="flex items-center gap-2 bg-gray-200 w-max px-3 py-1 rounded-full">
            <Sparkles size={18} className="mr-2 text-emerald-500" />
            <h2 className="text-md font-semibold text-gray-800 font-serif">
              AI Actions
            </h2>
          </div>
          <div className="text-gray-500 mt-2 text-sm">
            You can generate summaries or explain concepts in your document.
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Summary */}
          <div className="flex items-center justify-between bg-white rounded-xl border-2 border-gray-100  p-5 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-gray-200 p-2 rounded-xl">
                  <BookOpen size={18} className="text-emerald-500" />
                </span>
                <h2 className="text-md font-semibold text-gray-800 font-serif">
                  Generate Summary
                </h2>
              </div>
              <h2 className="max-w-lg">
                generate a summary of the document to get a quick overview of
                its content, main points, and key takeaways.
              </h2>
            </div>
            <button
              onClick={handleGenerateSummary}
              disabled={loading}
              className={`w-[200px] flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition ${
                loadingAction === "summary"
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              <BookOpen size={16} className="mr-2" />
              {loadingAction === "summary"
                ? "Generating..."
                : "Generate Summary"}
            </button>
          </div>

          {/* Concept Input */}
          <div className="bg-white rounded-xl border-2 border-gray-100  p-5 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-200 p-2 rounded-xl">
                  <Lightbulb size={18} className="text-emerald-500" />
                </span>
                <h2 className="text-md font-semibold text-gray-800 font-serif">
                  Explain a Concept
                </h2>
              </div>
              <p>
                Enter a concept you'd like the AI to explain in detail.
              </p>
            </div>
 
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                
                placeholder="Enter concept to explain"
                className="border w-md h-16 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 my-4 "
              />

              {/* Explain Button */}
              <button
                onClick={handleExplainConcept}
                disabled={loading}
                className={` flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  loadingAction === "explain"
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                }`}
              >
                <Lightbulb size={16} className="mr-2" />
                {loadingAction === "explain"
                  ? "Explaining..."
                  : "Explain Concept"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <MarkdownRender content={modalContent} />
      </Modal>
    </>
  );
};

export default AiActions;
