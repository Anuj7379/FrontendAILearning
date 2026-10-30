import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import documentService from "../../services/documentService";
import toast from "react-hot-toast";
import Spinner from "../../components/common/Spinner";
import { ArrowLeft, ExternalLink, RefreshCw } from "lucide-react";
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
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState("");
  const [pdfAttempt, setPdfAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchDocument = async () => {
      setLoading(true);
      try {
        const response = await documentService.getDocumentById(id);
        if (!cancelled) setDocument(response);
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error.message || error.error || "Failed to fetch document.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDocument();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    let objectUrl;

    const fetchPdf = async () => {
      setPdfUrl(null);
      setPdfError("");
      setPdfLoading(true);

      try {
        const file = await documentService.getDocumentFile(id);
        if (cancelled) return;
        objectUrl = URL.createObjectURL(file);
        setPdfUrl(objectUrl);
      } catch (error) {
        if (cancelled) return;
        const message =
          error.message || error.error || "Could not load this PDF.";
        setPdfError(message);
      } finally {
        if (!cancelled) setPdfLoading(false);
      }
    };

    fetchPdf();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [id, pdfAttempt]);

  const renderContent = () => {
    if (loading) return <Spinner />;
    if (!document?.filePath) {
      return (
        <p className="p-4 text-gray-500">PDF is not available for this document.</p>
      );
    }

    if (pdfLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      );
    }

    if (pdfError || !pdfUrl) {
      return (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="font-medium text-slate-800">PDF could not be loaded</p>
          <p className="max-w-lg text-sm text-slate-600">
            {pdfError || "The PDF file is not available."}
          </p>
          <button
            type="button"
            onClick={() => setPdfAttempt((attempt) => attempt + 1)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <RefreshCw size={16} /> Try again
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-500">Document</p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            Open PDF in new tab <ExternalLink size={16} />
          </a>
        </div>
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="h-[650px] w-full rounded-lg border"
          style={{ colorScheme: "light" }}
        />
      </div>
    );
  };

  const tabs = [
    { name: "Content", content: renderContent },
    { name: "Chat", content: () => <ChatInterface documentId={id} /> },
    { name: "AI Actions ", content: () => <AiActions documentId={id} /> },
    {
      name: "Flashcards",
      content: () => <FlashCardManager documentId={id} />,
    },
    { name: "Quizzes", content: () => <QuizManager documentId={id} /> },
  ];

  if (loading) return <Spinner />;
  if (!document) return <p className="p-6 text-gray-500">Document not found</p>;

  return (
    <div className="p-4 text-gray-800">
      <div className="py-2">
        <Link
          to="/documents"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
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
