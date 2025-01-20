import React from "react";

const JobTable = ({ jobs, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="table-header bg-gray-100">
            <th className="table-cell border border-gray-300 px-4 py-2">ID</th>
            <th className="table-cell border border-gray-300 px-4 py-2">Title</th>
            <th className="table-cell border border-gray-300 px-4 py-2">Location</th>
            <th className="table-cell border border-gray-300 px-4 py-2">Salary</th>
            <th className="table-cell border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50">
              <td className="table-cell border border-gray-300 px-4 py-2">{job.id}</td>
              <td className="table-cell border border-gray-300 px-4 py-2">{job.title}</td>
              <td className="table-cell border border-gray-300 px-4 py-2">{job.location}</td>
              <td className="table-cell border border-gray-300 px-4 py-2">{job.salary}$</td>
              <td className="table-cell border border-gray-300 px-4 py-2">
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => onEdit(job)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 w-28 rounded text-center"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(job.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 w-28 rounded text-center"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
