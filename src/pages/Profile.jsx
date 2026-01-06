import React, { useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  // Job data (frontend only)
  const jobs = [
    { id: 1, title: "Frontend Developer Intern", company: "Tech Solutions", skills: ["react", "html", "css"] },
    { id: 2, title: "Web Developer Intern", company: "Startup Company", skills: ["html", "css", "javascript"] },
    { id: 3, title: "Java Developer Fresher", company: "ABC Technologies", skills: ["java"] },
    { id: 4, title: "React JS Fresher", company: "Innovate Software", skills: ["react", "javascript"] },
    { id: 5, title: "Software Tester Fresher", company: "QualitySoft", skills: ["testing"] },
  ];

  // Profile strength
  const calculateStrength = () => {
    let strength = 40 + skills.length * 10;
    return strength > 100 ? 100 : strength;
  };

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setSkills([...skills, skillInput.toLowerCase()]);
      setSkillInput("");
    }
  };

  // Job matching logic
  const matchedJobs = jobs.map((job) => {
    const matchedSkills = job.skills.filter((skill) =>
      skills.includes(skill)
    );
    const matchPercent = Math.round(
      (matchedSkills.length / job.skills.length) * 100
    );

    return { ...job, matchPercent };
  }).filter(job => job.matchPercent > 0);

  return (
    <div style={pageBg}>
      <div style={container}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>
          My Profile
        </h2>

        {/* Name */}
        <h3 style={{ color: "black" }}>Name</h3>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        {/* Qualification */}
        <h3 style={{ color: "black" }}>Qualification</h3>
        <input
          type="text"
          placeholder="Enter your qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          style={input}
        />

        <hr />

        {/* Skills */}
        <h3 style={{ color: "black" }}>Skills</h3>
        <input
          type="text"
          placeholder="Add new skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          style={input}
        />
        <button onClick={addSkill} style={btn}>
          Add Skill
        </button>

        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <hr />

        {/* Profile Strength */}
        <h3 style={{ color: "black" }}>Profile Strength</h3>
        <progress
          value={calculateStrength()}
          max="100"
          style={{ width: "100%", height: "18px" }}
        />
        <p style={{ textAlign: "center", color: "black", fontWeight: "bold" }}>
          {calculateStrength()}%
        </p>

        <hr />

        {/* Suitable Jobs */}
        <h3 style={{ color: "black" }}>Suitable Jobs for You</h3>

        {matchedJobs.length === 0 && (
          <p style={{ color: "black" }}>Add skills to see job recommendations</p>
        )}

        {matchedJobs.map((job) => (
          <div key={job.id} style={jobCard}>
            <h4>{job.title}</h4>
            <p><b>Company:</b> {job.company}</p>
            <p><b>Match:</b> {job.matchPercent}%</p>

            <progress value={job.matchPercent} max="100" style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Styles ===== */

const pageBg = {
  width: "1400px",
  minHeight: "100vh",
  backgroundColor: "#e3f2fd",
  paddingTop: "20px",
};

const container = {
  width: "420px",
  margin: "auto",
  padding: "20px",
  backgroundColor: "lightpink",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(100, 97, 97, 0.1)",
};

const input = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const btn = {
  padding: "6px 12px",
  backgroundColor: "#1976d2",
  color: "yellow",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "10px",
};

const jobCard = {
  backgroundColor: "white",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export default Profile;
