// App.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Styles nécessaires pour React Toastify
import JobListPage from "./pages/JobListPage"; // Importer votre page de liste de jobs

function App() {
  return (
    <div className="App">
      <JobListPage />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeButton />
    </div>
  );
}

export default App;
