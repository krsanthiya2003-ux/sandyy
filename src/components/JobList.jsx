//src/components/JobList.jsx

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const API = "http://localhost:5000/api/jobs";

function JobList() {
  const formRef = useRef(null);
  const msgRef = useRef(null);

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [mailMsg, setMailMsg] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);

  // FETCH JOBS FROM DATABASE
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
  try {
    const res = await axios.get(API);
    setJobs(res.data);
  } catch (err) {
    console.error(err);
  }
};

const addJob = async () => {
  if (!title || !company) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await axios.post(API, { title, company });
    setJobs([...jobs, res.data]);
    setTitle("");
    setCompany("");
  } catch (err) {
    console.error(err.response?.data);
    alert("Error adding job");
  }
};


  const openApplyForm = (job) => {
    setSelectedJob(job);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const submitApplication = () => {
    if (!name || !email || !phone || !resume) {
      alert("Please fill all details and upload resume");
      return;
    }
    setAppliedJobs([...appliedJobs, selectedJob._id]);
    setMailMsg(`✅ Application submitted successfully for ${selectedJob.title}`);
    setShowForm(false);
    setTimeout(() => msgRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    setName(""); setEmail(""); setPhone(""); setResume(null);
    setTimeout(() => setMailMsg(""), 3000);
  };

  return (
    <div style={page}>
      <h1>Explore Fresher-Friendly Jobs</h1>
      <div style={formBox}>
        <h3>Add New Job</h3>
        <input placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} style={input} />
        <input placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} style={input} />
        <button onClick={addJob} style={addBtn}>Add Job</button>
      </div>

      <p>✅ Applied Jobs: {appliedJobs.length}</p>
      {mailMsg && <div ref={msgRef} style={mailBox}>{mailMsg}</div>}

      <div style={jobContainer}>
        {jobs.map((job) => {
          const isApplied = appliedJobs.includes(job._id);
          return (
            <div key={job._id} style={card}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <button
                disabled={isApplied}
                onClick={() => openApplyForm(job)}
                style={{ ...btn, backgroundColor: isApplied ? "#9ca3af" : "#2563eb" }}
              >
                {isApplied ? "Applied ✅" : "Apply Now"}
              </button>
            </div>
          );
        })}
      </div>

      {showForm && selectedJob && (
        <div ref={formRef} style={applyForm}>
          <h3>Apply for {selectedJob.title}</h3>
          <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={input} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
          <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />
          <input type="file" onChange={(e) => setResume(e.target.files[0])} style={input} />
          <button onClick={submitApplication} style={addBtn}>Submit Application</button>
        </div>
      )}
    </div>
  );
}

const page = { width: "1400px", margin: "auto", padding: "40px", textAlign: "center" };
const formBox = { background: "cyan", padding: "20px", width: "300px", margin: "20px auto", borderRadius: "10px" };
const input = { width: "90%", padding: "8px", margin: "6px 0" };
const addBtn = { padding: "8px 16px", background: "green", color: "white", border: "none", cursor: "pointer", marginTop: "10px" };
const jobContainer = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "30px" };
const card = { backgroundColor: "lightpink", width: "260px", padding: "20px", borderRadius: "10px" };
const btn = { padding: "10px 16px", border: "none", color: "white", cursor: "pointer" };
const mailBox = { margin: "20px auto", padding: "12px 18px", backgroundColor: "#d1fae5", color: "#065f46", fontWeight: "bold", borderRadius: "8px" };
const applyForm = { background: "#fff", padding: "20px", width: "320px", margin: "40px auto", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" };

export default JobList;