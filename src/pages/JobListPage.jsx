import React, { useState, useEffect } from "react";
import { fetchJobs, createJob, updateJob, deleteJob } from "../services/JobService";
import JobTable from "../Components/JobTable";
import Modal from "../Components/Modal";
import JobForm from "../Components/JobForm";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

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
      } else {
        await createJob(job);
      }
      setIsModalOpen(false);
      loadJobs();
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      loadJobs();
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job List</h1>
        <button
          onClick={() => {
            setSelectedJob(null);
            setIsModalOpen(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow"
        >
          New Job
        </button>
      </div>
      <JobTable
        jobs={jobs}
        onEdit={(job) => {
          setSelectedJob(job);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
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
    </div>
  );
};

export default JobListPage;
