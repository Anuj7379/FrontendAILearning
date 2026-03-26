import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Trash2, BookOpen, BrainCircuit, Clock } from "lucide-react";
import moment from "moment";

// format file size
const formatFileSize = (size) => {
  if (!size) return "File";
  if (size < 1024) return size + " B";
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + " KB";
  if (size < 1024 * 1024 * 1024)
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
};

const DocumentCard = ({ document, onDelete }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/documents/${document._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(document); // 🔥 parent modal trigger
  };

  return (
    <div onClick={handleNavigate} className="group cursor-pointer">
      <div className="h-full rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition p-5 flex flex-col justify-between">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center">
              <FileText size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 line-clamp-1">
                {document.title}
              </h3>

              <p className="text-xs text-gray-500">
                {formatFileSize(document.fileSize)}
              </p>
            </div>
          </div>

          <button
            onClick={handleDeleteClick}
            className="text-red-400 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* STATS */}
        <div className="flex gap-3 mt-4 text-xs">
          <div className="flex items-center gap-4 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
            <BookOpen size={14} />
            {document.flashcardCount || 0}
          </div>

          <div className="flex items-center gap-4 bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
            <BrainCircuit size={14} />
            {document.quizCount || 0}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-5 text-xs text-gray-500 border-t-1 border-gray-100 pt-2">
          <span className="flex items-center gap-1 ">
            <Clock size={14} />
            {moment(document.createdAt).fromNow()}
          </span>

          <span className="text-emerald-600 font-medium">Open →</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
