import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import documentService from "../../services/documentService";
import toast from "react-hot-toast";
import Spinner from "../../components/common/Spinner";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Tabs from "../../components/common/Tabs";
import ChatInterface from "../../components/chat/ChatInterface";
import AiActions from "../../components/ai/AiActions";
import FlashCardManager from "../../components/flashCards/FlashCardManager";
import QuizManager from "../../components/Quizzes/QuizManager";

const DocumentDetailPage = () => {
  const { id } = useParams();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      try {
        const response = await documentService.getDocumentById(id);
        setDocument(response);
        console.log("FULL RESPONSE:", response);
      } catch (error) {
        toast.error("Failed to fetch document", { error });
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  const getPdfUrl = () => {
    if (!document?.filePath) return null;

    const filePath = document.filePath;
    console.warn("File path is already a full URL:", filePath);

    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }

    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

    return `${baseUrl}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  /* ---------------- TABS CONTENT ---------------- */

  const renderContent = () => {
    if (loading) return <Spinner />;
    if (!document || !document.filePath) {
      return (
        <p className="text-gray-500 p-4">Pdf not available for this document</p>
      );
    }
    const pdfUrl = getPdfUrl();
    if (!pdfUrl) {
      return (
        <p className="text-gray-500 p-4">
          PDF URL is not available for this document
        </p>
      );
    }

    return (
      <div className="  ">
        <div className=" flex justify-between items-center mb-2">
          <p className="text-gray-500 text-lg font-semibold">Document</p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            Open PDF in new Tab <ExternalLink size={16} />
          </a>
        </div>
        <div>
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            frameBorder={0}
            style={{
              colorScheme: "light",
            }}
            className="w-full h-[650px] border rounded-lg"
          />
        </div>
      </div>
    );
  };

  const renderChat = () => {
    return <ChatInterface documentId={id} />;
  };

  const renderAI = () => {
    return <AiActions documentId={id} />;
  };

  const renderFlashcards = () => <FlashCardManager documentId={id} />;

  const renderQuizzes = () => <QuizManager documentId={id} />;

  const tabs = [
    { name: "Content", content: renderContent },
    { name: "Chat", content: renderChat },
    { name: "AI Actions ", content: renderAI },
    { name: "Flashcards", content: renderFlashcards },
    { name: "Quizzes", content: renderQuizzes },
  ];

  /* ---------------- STATES ---------------- */

  if (loading) return <Spinner />;
  if (!document) return <p className="p-6 text-gray-500">Document not found</p>;

  /* ---------------- UI ---------------- */

  return (
    <div className="text-gray-800 p-4  ">
      <div className="py-2">
        <Link
          to="/documents"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition"
        >
          <ArrowLeft size={16} />
          Back to Documents
        </Link>
      </div>
      <PageHeader title={document.title} />

      <div className="max-h-[600px]">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default DocumentDetailPage;
