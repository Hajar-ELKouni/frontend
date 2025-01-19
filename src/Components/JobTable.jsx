import React from "react";

const JobTable = ({ jobs, onEdit, onDelete }) => {
  return (
    <table className="table-auto w-full bg-white border border-gray-200 shadow-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Location</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Salary</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id} className="border-b border-gray-200">
            <td className="px-4 py-2">{job.title}</td>
            <td className="px-4 py-2">{job.location}</td>
            <td className="px-4 py-2">{job.salary}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => onEdit(job)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>{" "}
              |{" "}
              <button
                onClick={() => onDelete(job.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobTable;
