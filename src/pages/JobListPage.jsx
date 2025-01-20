// JobListPage.jsx
import React, { useState, useEffect } from "react";
import { fetchJobs, createJob, updateJob, deleteJob } from "../services/JobService";
import JobTable from "../Components/JobTable";
import Modal from "../Components/Modal";
import JobForm from "../Components/JobForm";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";
import { toast } from "react-toastify"; // Importer la fonction toast

const JobListPage = () => {
  const [jobs, setJobs] = useState([]); // Liste des jobs
  const [isModalOpen, setIsModalOpen] = useState(false); // Gestion de l'ouverture de la modale de création/modification
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Gestion de l'ouverture de la modale de confirmation de suppression
  const [selectedJob, setSelectedJob] = useState(null); // Job sélectionné pour édition
  const [jobToDelete, setJobToDelete] = useState(null); // Job sélectionné pour suppression

  // Charger la liste des jobs depuis l'API
  const loadJobs = async () => {
    try {
      const response = await fetchJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error.message);
    }
  };

  // Gestion de la soumission du formulaire de création/mise à jour
  const handleJobSubmit = async (job) => {
    try {
      if (job.id) {
        await updateJob(job); // Mise à jour d'un job existant
        toast.success("Job updated successfully!"); // Notification de succès
      } else {
        await createJob(job); // Création d'un nouveau job
        toast.success("Job created successfully!"); // Notification de succès
      }
      await loadJobs(); // Recharge les jobs après la modification
      setIsModalOpen(false); // Ferme la modale
    } catch (error) {
      toast.error("There was an error saving the job."); // Notification d'erreur
      console.error("Erreur lors de la sauvegarde :", error.message);
    }
  };

  // Gestion de la suppression d'un job
  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      toast.success("Job deleted successfully!"); // Notification de succès
      await loadJobs(); // Recharge les jobs après suppression
    } catch (error) {
      toast.error("There was an error deleting the job."); // Notification d'erreur
      console.error("Erreur lors de la suppression :", error.message);
    }
  };

  // Charger les jobs au premier rendu du composant
  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-6"> {/* Ajout du margin-top ici */}
      {/* En-tête de la page */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job List</h1>
        <button
          onClick={() => {
            setSelectedJob(null); // Réinitialiser le formulaire
            setIsModalOpen(true); // Ouvrir la modale
          }}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow"
        >
          New Job +
        </button>
      </div>

      {/* Tableau des jobs */}
      <JobTable
        jobs={jobs}
        onEdit={(job) => {
          setSelectedJob(job); // Remplit le formulaire avec les données du job sélectionné
          setIsModalOpen(true); // Ouvre la modale
        }}
        onDelete={(jobId) => {
          setJobToDelete(jobId); // Définit le job à supprimer
          setIsDeleteModalOpen(true); // Ouvre la modale de confirmation
        }}
      />

      {/* Modale pour le formulaire de création/mise à jour */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <JobForm
            initialJob={selectedJob} // Données du job à modifier ou formulaire vide
            onSubmit={handleJobSubmit}
            onCancel={() => setIsModalOpen(false)} // Annule l'opération et ferme la modale
          />
        </Modal>
      )}

      {/* Modale de confirmation de suppression */}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)} // Ferme la modale
          onDelete={handleDelete} // Fonction de suppression
          jobId={jobToDelete} // Job à supprimer
        />
      )}
    </div>
  );
};

export default JobListPage;
