import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const jobs = [
    { id: 1, title: "Frontend Developer Intern", company: "Tech Solutions", skill: "React", type: "IT" },
    { id: 2, title: "Web Developer Intern", company: "Startup Company", skill: "HTML CSS", type: "IT" },
    { id: 3, title: "Java Developer Fresher", company: "ABC Technologies", skill: "Java", type: "IT" },
    { id: 4, title: "React JS Fresher", company: "Innovate Software", skill: "React", type: "IT" },
    { id: 5, title: "Software Tester Fresher", company: "QualitySoft", skill: "Testing", type: "IT" },
    { id: 6, title: "Office Assistant", company: "Global Services", skill: "MS Office", type: "Office" },
    { id: 7, title: "Data Entry Operator", company: "DataCorp", skill: "Typing", type: "Office" },
    { id: 8, title: "HR Executive Fresher", company: "PeopleFirst", skill: "Communication", type: "Office" },
    { id: 9, title: "Back Office Executive", company: "Info Solutions", skill: "Documentation", type: "Office" },
  ];

  const handleApplyNow = (jobTitle) => {
    if (!user) {
      alert("Please login first to apply!");
      navigate("/login");
    } else if (user.role === "employer") {
      alert("Employers cannot apply for jobs.");
    } else {
      // Redirect to jobs page and pass the job title to filter or highlight it
      navigate("/jobs", { state: { selectedJobTitle: jobTitle } });
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={pageBg}>
      <div style={hero}>
        <h1>Smart Job Portal for Freshers</h1>
        <p style={{ fontSize: "18px" }}>IT & Office jobs – all in one place 🚀</p>
        <input
          type="text"
          placeholder="Search jobs (React, Java, Office...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchBox}
        />
      </div>

      <div style={section}>
        <h2 style={{color: "black"}}>Available Jobs</h2>
        <div style={jobGrid}>
          {filteredJobs.map((job) => (
            <div key={job.id} style={jobCard}>
              <h3>{job.title}</h3>
              <p><b>Company:</b> {job.company}</p>
              <p><b>Skill Required:</b> {job.skill}</p>
              <button 
                onClick={() => handleApplyNow(job.title)} 
                style={btnPrimary}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Styles kept consistent with your design */
const pageBg = { width: "100%", minHeight: "100vh", backgroundColor: "#f4f4f4" };
const hero = { textAlign: "center", padding: "60px 20px", background: "linear-gradient(to right, #2193b0, #6dd5ed)", color: "white" };
const searchBox = { width: "100%", maxWidth: "450px", padding: "12px", borderRadius: "8px", border: "none", marginTop: "15px" };
const btnPrimary = { padding: "10px 18px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%", fontWeight: "bold" };
const section = { padding: "40px 20px", textAlign: "center" };
const jobGrid = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" };
const jobCard = { backgroundColor: "white", padding: "20px", width: "280px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "left" };

export default Home;