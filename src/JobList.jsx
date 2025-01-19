import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // Job sélectionné pour édition

  // Charger les jobs depuis le backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/job");
      setJobs(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des jobs :", error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Ajouter ou mettre à jour un job
  const handleJobSubmit = async (job) => {
    try {
      if (job.id) {
        // Mise à jour
        await axios.put(`http://localhost:8080/job/${job.id}`, job, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Job mis à jour :", job);
      } else {
        // Ajout
        await axios.post("http://localhost:8080/job", job, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Nouveau job ajouté :", job);
      }
      fetchJobs(); // Recharger la liste des jobs
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error.message);
    }
  };

  // Supprimer un job
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:8080/job/${jobId}`);
      console.log("Job supprimé avec succès");
      fetchJobs();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.message);
    }
  };

  // Ouvrir la modale pour l'ajout
  const handleAddNewJob = () => {
    setSelectedJob(null); // Réinitialiser le job sélectionné
    setIsModalOpen(true);
  };

  // Ouvrir la modale pour l'édition
  const handleEditJob = (job) => {
    setSelectedJob(job); // Remplir les champs avec les données du job sélectionné
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job List</h1>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          onClick={handleAddNewJob}
        >
          New Job +
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Salary</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{job.id}</td>
              <td className="border border-gray-300 px-4 py-2">{job.title}</td>
              <td className="border border-gray-300 px-4 py-2">{job.location}</td>
              <td className="border border-gray-300 px-4 py-2">${job.salary}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex flex-col space-y-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded"
                    onClick={() => handleEditJob(job)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale */}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleJobSubmit}
          initialJob={selectedJob} // Passer le job sélectionné (ou null pour un ajout)
        />
      )}
    </div>
  );
};

export default JobList;