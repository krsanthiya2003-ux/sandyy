// src/components/JobList.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Employer State
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [skillsReq, setSkillsReq] = useState(""); // New State

  // Seeker Apply State
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const applyFormRef = useRef(null);

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs");
    setJobs(res.data);
  };

  const handleAddJob = async () => {
    if (!title || !company || !skillsReq) return alert("Please fill all fields, including skills!");
    await axios.post("http://localhost:5000/api/jobs", { 
      title, 
      company, 
      skillsRequired: skillsReq 
    });
    fetchJobs();
    setTitle(""); setCompany(""); setSkillsReq("");
    alert("Job Posted Successfully! ✅");
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplyForm(true);
    setTimeout(() => applyFormRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const submitApplication = () => {
    if (!resume) return alert("Please upload your resume!");
    // In a real app, you'd use FormData to send the file to the backend
    alert(`Application submitted for ${selectedJob.title} using ID: ${user.userId} ✅`);
    setShowApplyForm(false);
    setResume(null);
  };

  return (
    <div style={masterWrapper}>
      <div style={contentWidth}>
        <h1 style={{ color: "white" }}>Smart Job Portal</h1>

        {/* EMPLOYER SECTION */}
        {user?.role === "employer" && (
          <div style={addBox}>
            <h3 style={{marginTop: 0, color: "#2e7d32"}}>Post a New Job</h3>
            <input style={input} placeholder="Job Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input style={input} placeholder="Company Name" value={company} onChange={(e)=>setCompany(e.target.value)} />
            <input style={input} placeholder="Skills Required (e.g. React, Java)" value={skillsReq} onChange={(e)=>setSkillsReq(e.target.value)} />
            <button style={postBtn} onClick={handleAddJob}>Post Job</button>
          </div>
        )}

        {/* JOB LISTINGS */}
        <div style={jobGrid}>
          {jobs.map(job => (
            <div key={job._id} style={jobCard}>
              <span style={idTag}>Job ID: {job._id.slice(-4)}</span>
              <h3 style={{margin: "10px 0 5px 0"}}>{job.title}</h3>
              <p style={{margin: "0 0 10px 0", color: "#666"}}>🏢 {job.company}</p>
              <div style={skillBadge}>Skills: {job.skillsRequired}</div>
              
              {user?.role === "seeker" && (
                <button style={applyBtn} onClick={() => handleApplyClick(job)}>Apply Now</button>
              )}
            </div>
          ))}
        </div>

        {/* SEEKER APPLICATION FORM */}
        {showApplyForm && (
          <div ref={applyFormRef} style={applyOverlay}>
            <div style={applyModal}>
              <h3>Applying for: {selectedJob?.title}</h3>
              <p>Your Unique ID: <b>{user?.userId}</b></p>
              <label>Upload Resume (PDF/Doc):</label>
              <input type="file" style={input} onChange={(e) => setResume(e.target.files[0])} />
              <div style={{display: "flex", gap: "10px", marginTop: "15px"}}>
                <button style={postBtn} onClick={submitApplication}>Submit</button>
                <button style={cancelBtn} onClick={() => setShowApplyForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== STYLES ===== */
const masterWrapper = { width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", padding: "40px 0", backgroundColor: "#1a1a1a" };
const contentWidth = { width: "90%", maxWidth: "1100px", textAlign: "center" };
const addBox = { background: "#e8f5e9", padding: "25px", borderRadius: "12px", marginBottom: "40px", display: "inline-block", minWidth: "450px", border: "2px solid #2e7d32" };
const input = { padding: "12px", margin: "5px", borderRadius: "8px", border: "1px solid #ccc", width: "90%" };
const postBtn = { padding: "12px 25px", background: "#2e7d32", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
const cancelBtn = { padding: "12px 25px", background: "#666", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" };
const jobGrid = { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" };
const jobCard = { background: "#fff", padding: "20px", borderRadius: "15px", width: "280px", textAlign: "left", boxShadow: "0 10px 20px rgba(0,0,0,0.2)", position: "relative" };
const idTag = { fontSize: "10px", color: "#999", fontWeight: "bold" };
const skillBadge = { background: "#fff3e0", color: "#e65100", padding: "5px 10px", borderRadius: "5px", fontSize: "12px", fontWeight: "bold", marginBottom: "15px" };
const applyBtn = { width: "100%", padding: "12px", background: "#1976d2", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
const applyOverlay = { marginTop: "40px", padding: "20px", background: "#fff", borderRadius: "15px", boxShadow: "0 0 20px rgba(255,255,255,0.1)" };
const applyModal = { maxWidth: "500px", margin: "0 auto", textAlign: "left" };

export default JobList;