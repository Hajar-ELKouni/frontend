
import React, { useState, useEffect } from "react";
import { fetchJobs, createJob, updateJob, deleteJob } from "../services/JobService";
import JobTable from "../Components/JobTable";
import Modal from "../Components/Modal";
import JobForm from "../Components/JobForm";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";
import { toast } from "react-toastify"; 

const JobListPage = () => {
  const [jobs, setJobs] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [selectedJob, setSelectedJob] = useState(null); 
  const [jobToDelete, setJobToDelete] = useState(null); 

  
  const loadJobs = async () => {
    try {
      const response = await fetchJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error.message);
    }
  };

 
  const handleJobSubmit = async (job) => {
    try {
      if (job.id) {
        await updateJob(job); 
        toast.success("Job updated successfully!"); 
      } else {
        await createJob(job); 
        toast.success("Job created successfully!"); 
      }
      await loadJobs(); 
      setIsModalOpen(false); 
    } catch (error) {
      toast.error("There was an error saving the job."); 
      console.error("Erreur lors de la sauvegarde :", error.message);
    }
  };

  
  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      toast.success("Job deleted successfully!"); 
      await loadJobs(); 
    } catch (error) {
      toast.error("There was an error deleting the job."); 
      console.error("Erreur lors de la suppression :", error.message);
    }
  };

  
  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-6"> 
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job List</h1>
        <button
          onClick={() => {
            setSelectedJob(null); 
            setIsModalOpen(true); 
          }}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow"
        >
          New Job +
        </button>
      </div>


      <JobTable
        jobs={jobs}
        onEdit={(job) => {
          setSelectedJob(job); 
          setIsModalOpen(true); 
        }}
        onDelete={(jobId) => {
          setJobToDelete(jobId);
          setIsDeleteModalOpen(true); 
        }}
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <JobForm
            initialJob={selectedJob} 
            onSubmit={handleJobSubmit}
            onCancel={() => setIsModalOpen(false)} 
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)} 
          onDelete={handleDelete} 
          jobId={jobToDelete} 
        />
      )}
    </div>
  );
};

export default JobListPage;
