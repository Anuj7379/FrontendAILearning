import React, { useState, useEffect } from "react";
import { Upload, Trash2, FileText, X, Plus } from "lucide-react";
import toast from "react-hot-toast";

import documentService from "../../services/documentService";
import Spinner from "../../components/common/Spinner";
import Button from "../../components/common/Button";
import DocumentCard from "../../components/documents/DocumentCard";

const DocumentListPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // Delete modal state
  const [isDeleteOpenModal, setIsDeleteOpenModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  //  Fetch documents
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await documentService.getDocuments();
      setDocuments(data || []);
    } catch (error) {
      toast.error("Failed to fetch documents");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  //  File change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  // Upload document
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!uploadFile || !uploadTitle) {
      toast.error("Please provide title and file");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);

    try {
      setUploading(true);

      await documentService.uploadDocument(formData);

      toast.success("Document uploaded successfully");

      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      fetchDocuments();
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteRequest = (doc) => {
    setSelectedDoc(doc);
    setIsDeleteOpenModal(true);
  };
  //  Delete document
  const handleConfirmDelete = async () => {
    if (!selectedDoc) return;

    try {
      setDeleting(true);
      await documentService.deleteDocument(selectedDoc._id);

      toast.success("Document deleted");

      setIsDeleteOpenModal(false);
      setSelectedDoc(null);
      setDocuments(documents.filter((d) => d._id !== selectedDoc._id));
      fetchDocuments();
    } catch (error) {
      toast.error("Delete failed", { error });
    } finally {
      setDeleting(false);
    }
  };
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center ">
          <Spinner />
        </div>
      );
    }
    if (documents.length === 0) {
      return (
        <div className=" flex items-center justify-center flex-col gap-4 py-10 text-gray-700">
          <div className="flex items-center justify-center flex-col md:pt-24 sm:pt-16 pt-10">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <FileText className="mx-auto text-gray-400 w-12 h-12" />
            </div>
            <h3 className="text-lg font-semibold">No documents found.</h3>
            <p className="text-md">
              {" "}
              Please upload your first document to get started.
            </p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
          >
            <Plus size={18} strokeWidth={2.5} />
            Upload Document
          </button>
        </div>
      );
    }
    return (
      <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <DocumentCard
            key={doc._id}
            document={doc}
            onDelete={() => handleDeleteRequest(doc)}
          />
        ))}
      </div>
    );
  };

  //  Loading
  if (loading) return <Spinner />;

  return (
    <div className="h-screen  bg-gray-100 px-4">
      {/* Subtile background pattern */}

      <div className=" ">
        <div className="flex items-center justify-between mb-2 pt-4 ">
          {/*header*/}
          <div className="text-gray-700">
            <h1 className="text-2xl font-serif font-semibold italic ">
              My Documents
            </h1>
            <p className="text-md text-gray-600 ">
              Manage your Learning assets here.
            </p>
          </div>
          {/*content*/}
          {documents.length > 0 && (
            <Button
              variant="primary"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Plus className="mr-2" size={18} strokeWidth={2.5} />
              Upload Document
            </Button>
          )}
        </div>
        {renderContent()}
      </div>
      {/*  */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative animate-modalIn">
            {/*  Close */}
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={20} />
            </button>

            {/* 🧾 Header */}
            <h2 className="text-lg font-semibold text-gray-800">
              Upload New Document
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Add a PDF document to your library
            </p>

            {/*  FORM */}
            <form onSubmit={handleUpload} className="space-y-5">
              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Document Title
                </label>

                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Choose custom title or use filename"
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-emerald-400 outline-none transition"
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  PDF File
                </label>

                <label
                  htmlFor="file-upload"
                  className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:border-emerald-400 transition text-center"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-xl mb-3">
                    <Upload size={22} />
                  </div>

                  <p className="text-sm text-emerald-600 font-medium">
                    Click to upload
                    <span className="text-gray-500"> or drag and drop</span>
                  </p>

                  <p className="text-xs text-gray-400 mt-1">PDF up to 10MB</p>

                  {uploadFile && (
                    <p className="mt-2 text-sm text-gray-700 font-medium">
                      {uploadFile.name}
                    </p>
                  )}

                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              {/* 🔘 Footer buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* DELETE MODAL */}
      {isDeleteOpenModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h2 className="font-semibold text-lg flex gap-2 items-center">
              <span className="bg-red-100 p-2 rounded-md">
                <Trash2 size={18} className="text-red-500" />
              </span>{" "}
              Delete Document
            </h2>

            <p className="text-gray-600 mt-2">
              Delete <b>{selectedDoc?.title}</b>?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsDeleteOpenModal(false)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                disabled={deleting}
                onClick={handleConfirmDelete}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentListPage;
