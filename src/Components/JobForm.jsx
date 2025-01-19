import React, { useState } from "react";

const JobForm = ({ initialJob, onSubmit, onCancel }) => {
  const [job, setJob] = useState(
    initialJob || { title: "", location: "", salary: "", description: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(job);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          name="title"
          value={job.title}
          onChange={handleChange}
          className="w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Location</label>
        <input
          name="location"
          value={job.location}
          onChange={handleChange}
          className="w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Salary</label>
        <input
          name="salary"
          type="number"
          value={job.salary}
          onChange={handleChange}
          className="w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          className="w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobForm;
