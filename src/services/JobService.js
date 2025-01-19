import axios from "axios";

const API_URL = "http://localhost:8080/job";

export const fetchJobs = () => axios.get(API_URL);

export const createJob = (job) => axios.post(API_URL, job, {
  headers: { "Content-Type": "application/json" },
});

export const updateJob = (job) => axios.put(`${API_URL}/${job.id}`, job, {
  headers: { "Content-Type": "application/json" },
});

export const deleteJob = (jobId) => axios.delete(`${API_URL}/${jobId}`);
