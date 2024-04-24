import  { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineUpload, AiOutlineDelete } from "react-icons/ai"; // Importing icons

const DocumentSharing = () => {
  // State for documents and file upload error
  const [documents, setDocuments] = useState([
    { id: 1, name: "Project Proposal.pdf", size: "1.2 MB", date: "2024-04-22" },
    { id: 2, name: "Meeting Minutes.docx", size: "0.8 MB", date: "2024-04-20" },
    // Add more documents here
  ]);
  const [uploadError, setUploadError] = useState("");

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Placeholder implementation for uploading to backend
      const newDocument = {
        id: documents.length + 1,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        date: new Date().toISOString().split("T")[0],
      };
      setDocuments([...documents, newDocument]);
      setUploadError("");
    } else {
      setUploadError("Please select a file.");
    }
  };

  // Function to handle document deletion
  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">
          Document Sharing
        </h1>
        {/* File upload */}
        <label
          htmlFor="fileUpload"
          className="flex items-center inline-block px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
        >
          <AiOutlineUpload className="mr-2" />
          Upload Document
        </label>
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={handleFileUpload}
        />
        {uploadError && <p className="mt-2 text-red-500">{uploadError}</p>}
        {/* Document list */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Recent Documents
          </h2>
          {documents.map((document) => (
            <motion.div
              key={document.id}
              className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <div>
                <p className="text-lg font-semibold">{document.name}</p>
                <p className="text-sm text-gray-600">
                  {document.size} | {document.date}
                </p>
              </div>
              <motion.button
                onClick={() => handleDeleteDocument(document.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center text-red-500"
              >
                <AiOutlineDelete className="mr-1" />
                Delete
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentSharing;
