import React, { useState } from "react";
import "./App.css";

const API_BASE = "https://nativebridgeproject.fly.dev";

function App() {
  const [step, setStep] = useState("code"); // "code" | "submit" | "done"
  const [code, setCode] = useState("");
  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ------------------------------
  // STEP 1: LOOK UP SESSION BY CODE
  // ------------------------------
  const handleLookup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const trimmed = code.trim();
    if (!trimmed) {
      setError("Please enter your 6-digit submission code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/submissions/${trimmed}`);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Invalid or expired code.");
        setSession(null);
        return;
      }

      const data = await res.json();
      setSession(data);
      setStep("submit");
    } catch (err) {
      console.error("Lookup error:", err);
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // STEP 2: SUBMIT WORK
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!session?.code) {
      setError("Missing session. Please re-enter your code.");
      setStep("code");
      return;
    }

    if (!file && !url.trim()) {
      setError("Please select a file or enter a URL.");
      return;
    }

    setSubmitting(true);
    try {
      let res;

      // FILE OR FILE + URL submission
      if (file) {
        const formData = new FormData();
        formData.append("file", file); // IMPORTANT: must be "files"
        if (notes.trim()) formData.append("notes", notes.trim());
        if (url.trim()) formData.append("url", url.trim());

        res = await fetch(
          `${API_BASE}/api/submissions/${session.code}/submit`,
          {
            method: "POST",
            body: formData,
          }
        );
      }

      // URL-ONLY submission
      else {
        res = await fetch(
          `${API_BASE}/api/submissions/${session.code}/submit`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: url.trim(),
              notes: notes.trim(),
            }),
          }
        );
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Submission failed. Please try again.");
        return;
      }

      const data = await res.json().catch(() => ({}));
      setSuccessMessage(
        data.message || "Submission received. Your client will review it soon."
      );

      setStep("done");
    } catch (err) {
      console.error("Submit error:", err);
      setError("Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep("code");
    setCode("");
    setSession(null);
    setFile(null);
    setUrl("");
    setNotes("");
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="app-root">
      <div className="app-bg" />

      <div className="app-shell">
        <header className="app-header">
          <div className="logo-circle">NB</div>
          <div className="header-text">
            <h1>NativeBridge Submission Portal</h1>
            <p>Send your completed work securely to your client.</p>
          </div>
        </header>

        <main className="card">
          {/* STEP 1 — ENTER CODE */}
          {step === "code" && (
            <>
              <h2 className="card-title">Enter Submission Code</h2>
              <p className="card-subtitle">
                Open your NativeBridge app, start a desktop submission, and
                enter the 6-digit code shown on your phone.
              </p>

              <form onSubmit={handleLookup} className="form">
                <label className="label">
                  Submission Code
                  <input
                    className="input"
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    placeholder="123456"
                  />
                </label>

                {error && <div className="error-banner">{error}</div>}

                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? "Checking..." : "Continue"}
                </button>
              </form>
            </>
          )}

          {/* STEP 2 — SUBMIT WORK */}
          {step === "submit" && session && (
            <>
              <h2 className="card-title">Submit Work</h2>
              <p className="card-subtitle">
                Job: <span className="accent">{session.jobTitle}</span>
              </p>
              <p className="card-subtitle small">
                Code: <span className="mono">{session.code}</span>
              </p>

              <form onSubmit={handleSubmit} className="form">
                <div className="info-box">
                  <strong>How it works:</strong>
                  <ul>
                    <li>
                      <span className="accent">Option 1:</span> Upload a file
                      (zip, images, docs, etc.).
                    </li>
                    <li>
                      <span className="accent">Option 2:</span> Submit a link to
                      your work (GitHub, Figma, website, etc.).
                    </li>
                    <li>You can also do both.</li>
                  </ul>
                </div>

                <label className="label">
                  File (optional)
                  <input
                    className="file-input"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                  />
                </label>

                <label className="label">
                  Work URL (optional)
                  <input
                    className="input"
                    type="url"
                    placeholder="https://link-to-your-work"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </label>

                <label className="label">
                  Notes for your client (optional)
                  <textarea
                    className="textarea"
                    rows={4}
                    placeholder="Explain what you delivered or any instructions."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>

                {error && <div className="error-banner">{error}</div>}

                <button type="submit" className="primary-btn" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Work"}
                </button>

                <button
                  type="button"
                  className="ghost-btn"
                  onClick={handleReset}
                  disabled={submitting}
                >
                  Start Over
                </button>
              </form>
            </>
          )}

          {/* STEP 3 — DONE */}
          {step === "done" && (
            <div className="success-state">
              <h2 className="card-title">Submission Complete</h2>
              {successMessage && (
                <p className="card-subtitle">{successMessage}</p>
              )}

              <p className="success-detail">
                Your client will review your submission inside NativeBridge.
              </p>

              <button className="primary-btn" onClick={handleReset}>
                Submit More Work
              </button>
            </div>
          )}
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} NativeBridge</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
