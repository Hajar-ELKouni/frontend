import React, { useState, useEffect } from "react";

const Modal = ({ onClose, onSubmit, initialJob }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  // Pré-remplir les champs si un job est fourni
  useEffect(() => {
    if (initialJob) {
      setTitle(initialJob.title || "");
      setLocation(initialJob.location || "");
      setSalary(initialJob.salary || "");
      setDescription(initialJob.description || "");
    }
  }, [initialJob]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !location || !salary || !description) {
      alert("Tous les champs sont requis !");
      return;
    }

    const job = {
      id: initialJob?.id, // Inclure l'ID pour une mise à jour
      title,
      location,
      salary: parseInt(salary, 10),
      description,
    };

    onSubmit(job); // Appeler la fonction de soumission (ajout ou mise à jour)
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">{initialJob ? "Update Job" : "Create new job"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Titre et Location sur la même ligne */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Champ Salary */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Champ Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Boutons Cancel et Add/Update */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              {initialJob ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;