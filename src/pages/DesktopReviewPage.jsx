import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const API_BASE = "https://nativebridgeproject.fly.dev";

export default function ReviewPortal() {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================================================
     FETCH JOB + SUBMISSIONS (PUBLIC REVIEW ROUTE)
  ============================================================ */
  useEffect(() => {
    if (!jobId) {
      setError("Missing job ID.");
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/review/${jobId}` // ✅ FIXED ROUTE
        );

        if (!res.ok) {
          throw new Error("Job not found or unavailable.");
        }

        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Review fetch error:", err);
        setError(err.message || "Unable to load job.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  /* ============================================================
     DOWNLOAD FILE (SIGNED URL)
  ============================================================ */
  const handleDownload = async (file) => {
    if (!file?.key) {
      alert("This file is unavailable for secure download.");
      return;
    }

    try {
      const encodedKey = encodeURIComponent(file.key);

      const res = await fetch(
        `${API_BASE}/api/review/download/${job._id}/${encodedKey}`

      );

      if (!res.ok) {
        throw new Error("Download failed.");
      }

      const data = await res.json();
      window.open(data.url, "_blank");
    } catch (err) {
      console.error("Download error:", err);
      alert("Unable to download file.");
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <div className="app-root">
      <div className="app-bg" />

      <div className="app-shell">
        <header className="app-header">
          <div className="logo-circle">NB</div>
          <div className="header-text">
            <h1>Submission Review</h1>
            <p>Review submitted work and download files.</p>
          </div>
        </header>

        <main className="card">
          {loading && <p>Loading submission…</p>}

          {error && <div className="error-banner">{error}</div>}

          {!loading && job && (
            <>
              <h2 className="card-title">{job.title}</h2>

              <p className="card-subtitle">
                Status: <span className="accent">{job.status}</span>
              </p>

              <h3 className="section-title">Submissions</h3>

              {!job.submissions?.length && (
                <p className="muted">No submissions yet.</p>
              )}

              {job.submissions?.map((sub, index) => (
                <div key={index} className="submission-card">
                  <p className="mono">
                    Submitted:{" "}
                    {new Date(sub.submittedAt).toLocaleString()}
                  </p>

                  {sub.notes && (
                    <div className="info-box">
                      <strong>Notes</strong>
                      <p>{sub.notes}</p>
                    </div>
                  )}

                  {sub.files?.map((file, i) => (
                    <button
                      key={i}
                      className="file-btn"
                      onClick={() => handleDownload(file)}
                    >
                      📄 {file.name}
                    </button>
                  ))}
                </div>
              ))}
            </>
          )}
        </main>

        <footer className="footer">
          © {new Date().getFullYear()} NativeBridge
        </footer>
      </div>
    </div>
  );
}
