//src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");

  // Job data (IT + Office Work)
  const jobs = [
    { id: 1, title: "Frontend Developer Intern", company: "Tech Solutions", skill: "React", type: "IT" },
    { id: 2, title: "Web Developer Intern", company: "Startup Company", skill: "HTML CSS", type: "IT" },
    { id: 3, title: "Java Developer Fresher", company: "ABC Technologies", skill: "Java", type: "IT" },
    { id: 4, title: "React JS Fresher", company: "Innovate Software", skill: "React", type: "IT" },
    { id: 5, title: "Software Tester Fresher", company: "QualitySoft", skill: "Testing", type: "IT" },
     
    // OFFICE WORK JOBS
    { id: 6, title: "Office Assistant", company: "Global Services", skill: "MS Office", type: "Office" },
    { id: 7, title: "Data Entry Operator", company: "DataCorp", skill: "Typing", type: "Office" },
    { id: 8, title: "HR Executive Fresher", company: "PeopleFirst", skill: "Communication", type: "Office" },
    { id: 9, title: "Back Office Executive", company: "Info Solutions", skill: "Documentation", type: "Office" },
    { id: 10, title: "Office work", company: "Thiran360AI", skill: "communication",type:"Non-IT" },
    { id: 11,title: "Backend Developer", company:"Thiran360AI", skill: "Database Knowledge(must)",type:"IT" },
  ];

  // Search filter
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={pageBg}>
      {/* Hero Section */}
      <div style={hero}>
        <h1>Smart Job Portal for Freshers</h1>
        <p style={{ fontSize: "18px" }}>
          IT & Office jobs – all in one place 🚀
        </p>

        <input
          type="text"
          placeholder="Search jobs (React, Java, Office, Data Entry)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchBox}
        />

        <p style={{ fontSize: "14px", marginTop: "8px" }}>
          Popular searches: React, Java, Office Assistant, Data Entry
        </p>

        <Link to="/register">
          <button style={btnPrimary}>Sign Up</button>
        </Link>
      </div>

      {/* Available Jobs */}
      <div style={section}>
         <h2 style={{color:"black"}}>Available Jobs</h2>

        {filteredJobs.length === 0 && <p>No jobs found</p>}

        <div style={jobGrid}>
          {filteredJobs.map((job) => (
            <div key={job.id} style={jobCard}>
              <h3>
                {job.title}
                {job.type === "Office" && (
                  <span style={officeBadge}>Office Work</span>
                )}
                {job.skill === "React" && (
                  <span style={itBadge}>IT</span>
                )}
              </h3>

              <p><b>Company:</b> {job.company}</p>
              <p><b>Skill:</b> {job.skill}</p>

              <Link to="/register">
                <button style={btnPrimary}>Apply Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={section}>
        <h2 style={{color:"black"}}>How It Works</h2>
        <div style={grid}>
          <div style={feature}>1️⃣ Sign Up</div>
          <div style={feature}>2️⃣ Choose IT / Office</div>
          <div style={feature}>3️⃣ Get Job Matches</div>
          <div style={feature}>4️⃣ Apply Easily</div>
        </div>
      </div>

      {/* Office Work Highlights */}
      <div style={section}>
        <h2 style={{color:"black"}}>Office Work Opportunities</h2>
        <div style={grid}>
          <div style={officeCard}>Office Assistant</div>
          <div style={officeCard}>Data Entry</div>
          <div style={officeCard}>Back Office</div>
          <div style={officeCard}>HR Executive</div>
        </div>
      </div>

      {/* Stats */}
      <div style={stats}>
        <div style={card}><h2>500+</h2><p>Jobs</p></div>
        <div style={card}><h2>120+</h2><p>Companies</p></div>
        <div style={card}><h2>2000+</h2><p>Freshers</p></div>
      </div>
    </div>
  );
}

/* ===== Styles ===== */

const pageBg = {
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "lightgray",
};

const hero = {
  textAlign: "center",
  padding: "60px 20px",
  background: "linear-gradient(to right, #2193b0, #6dd5ed)",
  color: "black",
};

const searchBox = {
  width: "100%",
  maxWidth: "450px",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  marginTop: "15px",
};

const btnPrimary = {
  padding: "10px 18px",
  marginTop: "10px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const section = {
  padding: "40px 20px",
  textAlign: "center",
};

const jobGrid = {
  color:"black",
  backgroundColor:"lightpink",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
};

const jobCard = {
  backgroundColor: "olivrgreen",
  padding: "20px",
  width: "280px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
};

const itBadge = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  marginLeft: "6px",
};

const officeBadge = {
  backgroundColor: "#ff9800",
  color: "black",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  marginLeft: "6px",
};

const grid = {
  color:"black",
  backgroundColor:"gray",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "15px",
};

const feature = {
  backgroundColor: "#ff5252",
  color: "white",
  padding: "15px 22px",
  borderRadius: "8px",
};

const officeCard = {
  color:"black",
  backgroundColor: "#ffe0b2",
  padding: "15px 25px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const stats = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  padding: "30px",
};

const card = {
  color:"black",
  backgroundColor: "#e0e0e0",
  padding: "20px",
  width: "140px",
  borderRadius: "10px",
};

export default Home;
