import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

// Get all documents
const getDocuments = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.DOCUMENT.GET_DOCUMENTS);
    return response.data?.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch documents" };
  }
};

const uploadDocument = async (formData) => {
  try {
    const response = await axiosInstance.post(
      API_PATHS.DOCUMENT.UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data?.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to upload document" };
  }
};

//  Delete document
const deleteDocument = async (id) => {
  try {
    const response = await axiosInstance.delete(
      API_PATHS.DOCUMENT.DELETE_DOCUMENT(id),
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete document" };
  }
};

//  Get document by ID
const getDocumentById = async (_id) => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.DOCUMENT.GET_DOCUMENT_BY_ID(_id),
    );
    return response.data?.data;
    
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch ssdocument" };
  }
};

const documentService = {
  getDocuments,
  uploadDocument,
  deleteDocument,
  getDocumentById,
};

export default documentService;
