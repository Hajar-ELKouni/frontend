
import React from "react";

const DeleteConfirmModal = ({ isOpen, onClose, onDelete, jobId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="mb-6">Do you really want to delete this job? </p>
        <div className="flex justify-between">
          <button
            onClick={() => onClose()} 
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(jobId); 
              onClose(); 
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
