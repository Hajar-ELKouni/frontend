import { useState, useEffect } from "react";
import { fetchJobs, addJob, updateJob, deleteJob } from "../services/JobService";

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      alert("Erreur lors du chargement des jobs.");
    }
  };

  const handleJobSubmit = async (job) => {
    try {
      if (job.id) {
        await updateJob(job);
      } else {
        await addJob(job);
      }
      loadJobs(); // Recharge la liste des jobs après ajout/mise à jour
      setIsModalOpen(false); // Ferme la modale
    } catch (error) {
      alert("Erreur lors de la soumission du job.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      loadJobs(); // Recharge la liste des jobs après suppression
    } catch (error) {
      alert("Erreur lors de la suppression du job.");
    }
  };

  return {
    jobs,
    isModalOpen,
    selectedJob,
    setIsModalOpen,
    setSelectedJob,
    handleJobSubmit, // Assurez-vous que cette fonction est bien retournée
    handleDeleteJob,
  };
};

export default useJobs;