import React, { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, Sparkles } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../common/Spinner";
import MarkdownRender from "../common/MarkdownRender";
import { useAuth } from "../../context/authContext.jsx";
import aiService from "../../services/aiService.js";

const ChatInterface = () => {
  const { id: documentId } = useParams();
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setInitialLoading(true);
        const response = await aiService.getChatHistory(documentId);
        console.log("Chat history response:", response.data);
        setHistory(response.data || []);
      } catch (err) {
        toast.error("Failed to fetch chat history");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchChatHistory();
  }, [documentId]);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await aiService.chat(documentId, userMessage.content);

      const assistantMessage = {
        role: "assistant",
        content: response.data?.answer || "",
        timestamp: new Date().toISOString(),
        relevantChunks: response.data?.relevantChunks || [],
      };

      setHistory((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("chat error:", err);

      const errorMessage = {
        role: "assistant",
        content:
          err.response?.data?.message ||
          err.message ||
          "Failed to get response from assistant",
        timestamp: new Date().toISOString(),
      };

      setHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (msg, index) => {
    return (
      <div
        key={index}
        className={`max-w-[80%] p-4 rounded-lg mb-4 ${
          msg.role === "user"
            ? "bg-blue-100 self-end text-right"
            : "bg-gray-100 self-start text-left"
        }`}
      >
        <MarkdownRender content={msg.content} />
      </div>
    );
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="mb-4 bg-emerald-100 p-4 rounded-2xl flex items-center gap-2">
          <MessageSquare strokeWidth={2} className="w-5 h-5 text-emerald-500" />
        </div>
        <Spinner />
        <p className="text-emerald-500 text-lg">Loading chat history...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
      {/* 🔹 Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-10 lg:px-20">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-emerald-100 p-4 rounded-2xl mb-4">
              <MessageSquare className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">
              Start your conversation
            </h3>
            <p className="text-gray-500 text-sm">
              Ask me anything about the document
            </p>
          </div>
        ) : (
          history.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm max-w-[85%] md:max-w-[70%] text-sm leading-relaxed
              ${
                msg.role === "user"
                  ? "bg-emerald-500 text-white rounded-br-md"
                  : "bg-white text-gray-800 border rounded-bl-md"
              }`}
              >
                <MarkdownRender content={msg.content} />
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Spinner size="sm" />
            Assistant is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 🔹 Input Area */}
      <div className="border-t bg-white px-4 py-3 md:px-10 lg:px-20">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 max-w-5xl mx-auto"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 max-w-5xl mx-auto">
          <Sparkles className="w-4 h-4" />
          Ask questions, summaries, explanations and more
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
