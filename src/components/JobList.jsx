import React, { useState, useRef } from "react";

function JobList() {
  const formRef = useRef(null);
  const msgRef = useRef(null); // ✅ message ref

  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer (Fresher)", company: "TCS" },
    { id: 2, title: "Java Developer – Trainee", company: "Infosys" },
    { id: 3, title: "Web Developer Intern", company: "Startup Company" },
    { id: 4, title: "React JS Fresher", company: "Innovate Software" },
    { id: 5, title: "Software Tester Fresher", company: "QualitySoft" },
    { id: 6, title: "Office Assistant", company: "Global Services" },
    { id: 7, title: "Data Entry Operator", company: "DataCorp" },
    { id: 8, title: "Backend Developer", company: "Cloud" },
    { id: 9, title: "Office Assistant", company: "ABC Company" },
    { id: 10, title: "Bank Manager", company: "SBI" },
    { id: 11, title: "TL (Experienced Person)", company: "TCS" }
  ]);

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

  // open apply form
  const openApplyForm = (job) => {
    setSelectedJob(job);
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ✅ SUBMIT APPLICATION (AUTO MESSAGE SHOW)
  const submitApplication = () => {
    if (!name || !email || !phone || !resume) {
      alert("Please fill all details and upload resume");
      return;
    }

    setAppliedJobs([...appliedJobs, selectedJob.id]);

    setMailMsg(
      `✅ Application submitted successfully for ${selectedJob.title} at ${selectedJob.company}`
    );

    setShowForm(false);

    // 🔥 auto scroll to message
    setTimeout(() => {
      msgRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // reset
    setName("");
    setEmail("");
    setPhone("");
    setResume(null);

    // auto hide message
    setTimeout(() => setMailMsg(""), 3000);
  };

  const addJob = () => {
    if (!title || !company) {
      alert("Please fill all fields");
      return;
    }
    setJobs([...jobs, { id: jobs.length + 1, title, company }]);
    setTitle("");
    setCompany("");
  };

  return (
    <div style={page}>
      <h1>Explore Fresher-Friendly Jobs</h1>

      {/* ADD JOB */}
      <div style={formBox}>
        <h3>Add New Job</h3>
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />
        <input
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={input}
        />
        <button onClick={addJob} style={addBtn}>Add Job</button>
      </div>

      <p>✅ Applied Jobs: {appliedJobs.length}</p>

      {/* ✅ AUTO SHOW MESSAGE */}
      {mailMsg && (
        <div ref={msgRef} style={mailBox}>
          {mailMsg}
        </div>
      )}

      {/* JOB LIST */}
      <div style={jobContainer}>
        {jobs.map((job) => {
          const isApplied = appliedJobs.includes(job.id);
          return (
            <div key={job.id} style={card}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <button
                disabled={isApplied}
                onClick={() => openApplyForm(job)}
                style={{
                  ...btn,
                  backgroundColor: isApplied ? "#9ca3af" : "#2563eb",
                }}
              >
                {isApplied ? "Applied ✅" : "Apply Now"}
              </button>
            </div>
          );
        })}
      </div>

      {/* APPLY FORM */}
      {showForm && selectedJob && (
        <div ref={formRef} style={applyForm}>
          <h3>Apply for {selectedJob.title}</h3>

          <input placeholder="Your Name" value={name}
            onChange={(e) => setName(e.target.value)} style={input} />

          <input placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} style={input} />

          <input placeholder="Phone" value={phone}
            onChange={(e) => setPhone(e.target.value)} style={input} />

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            style={input}
          />

          {resume && (
            <p style={{ color: "green", fontSize: "14px" }}>
              📄 Uploaded: <b>{resume.name}</b> ✅
            </p>
          )}

          <button onClick={submitApplication} style={addBtn}>
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
}

/* ===== Styles ===== */

const page = {
  width: "1400px",
  margin: "auto",
  padding: "40px",
  textAlign: "center",
};

const formBox = {
  background: "cyan",
  padding: "20px",
  width: "300px",
  margin: "20px auto",
  borderRadius: "10px",
};

const input = {
  width: "90%",
  padding: "8px",
  margin: "6px 0",
};

const addBtn = {
  padding: "8px 16px",
  background: "green",
  color: "white",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
};

const jobContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
  marginTop: "30px",
};

const card = {
  backgroundColor: "lightpink",
  width: "260px",
  padding: "20px",
  borderRadius: "10px",
};

const btn = {
  padding: "10px 16px",
  border: "none",
  color: "white",
  cursor: "pointer",
};

const mailBox = {
  margin: "20px auto",
  padding: "12px 18px",
  backgroundColor: "#d1fae5",
  color: "#065f46",
  fontWeight: "bold",
  borderRadius: "8px",
  width: "fit-content",
};

const applyForm = {
  background: "#fff",
  padding: "20px",
  width: "320px",
  margin: "40px auto",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

export default JobList;
