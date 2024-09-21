import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { X, Send, Loader } from "lucide-react";

const MessageDialog = ({ isOpen, onClose, applicant }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/recruiter/messageApplicant",
        {
          email: applicant.email,
          messageContent: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message || "Message sent successfully!");
      setMessage("");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Message {applicant.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
          >
            <X size={24} />
          </button>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200"
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader
                    className="animate-spin mr-2"
                    size={18}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send
                    className="mr-2"
                    size={18}
                  />
                  Send
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

MessageDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  applicant: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageDialog;
