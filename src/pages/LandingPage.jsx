import React from "react";
import "../App.css";

const APP_URL = "https://nativebridgeproject.com/app"; // <-- CHANGE TO YOUR REAL APP LINK

export default function LandingPage() {
  return (
    <div className="app-root">
      <div className="app-bg" />
      <div className="app-shell">
        <header className="app-header">
          <div className="logo-circle">NB</div>
          <div className="header-text">
            <h1>NativeBridge</h1>
            <p>Marketplace for Tech Work — Official Business Page</p>
          </div>
        </header>

        <main className="card" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #00bfff, #0077ff)",
            color: "#000", padding: "6px 14px", borderRadius: "999px",
            fontWeight: 800, fontSize: "12px", marginBottom: "16px"
          }}>
            OFFICIAL BUSINESS PAGE
          </span>

          <h2 className="card-title" style={{ fontSize: "36px", lineHeight: 1.1 }}>
            Marketplace for on-demand tech work
          </h2>
          <p className="card-subtitle">
            NativeBridge connects clients with independent tech professionals for short-term and on-demand digital work.
          </p>

          {/* HIGH VISIBILITY APP URL FOR IG ADS REVIEW */}
          <div className="info-box" style={{ marginTop: "28px", border: "1px solid #00bfff" }}>
            <strong>Platform Access — Find Your App URL Here:</strong>
            <div className="mono" style={{
              background: "#000", border: "1px solid #222",
              padding: "12px", borderRadius: "10px", marginTop: "8px",
              wordBreak: "break-all", fontSize: "16px"
            }}>
              <a href={APP_URL} style={{ color: "#00bfff" }}>{APP_URL}</a>
            </div>
            <p className="card-subtitle small" style={{ marginTop: "8px", marginBottom: 0 }}>
              Official app URL — accessible from Instagram ads for compliance.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
            <a href={APP_URL} className="primary-btn" style={{ textDecoration: "none" }}>Open App →</a>
            <a href={APP_URL} className="ghost-btn" style={{ textDecoration: "none" }}>Download App</a>
          </div>

          <div className="info-box" style={{ marginTop: "32px" }}>
            <h3 className="card-title" style={{ fontSize: "18px" }}>What We Do</h3>
            <p className="card-subtitle small">Clients post technical jobs such as software development, IT support, and digital services. Workers accept jobs, complete the work, and submit deliverables through the platform.</p>
          </div>

          <div className="info-box" style={{ marginTop: "16px" }}>
            <h3 className="card-title" style={{ fontSize: "18px" }}>How Payments Work</h3>
            <p className="card-subtitle small">Payments are authorized when a worker accepts a job and are held securely until work is submitted and approved by the client. If a dispute is opened, payments are paused until resolved.</p>
          </div>

          <div className="info-box" style={{ marginTop: "16px" }}>
            <h3 className="card-title" style={{ fontSize: "18px" }}>Contact</h3>
            <p className="card-subtitle small">
              Support: <a href="mailto:support@nativebridgeproject.com" className="accent">support@nativebridgeproject.com</a><br/>
              App: <a href={APP_URL} className="accent">{APP_URL}</a>
            </p>
          </div>
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} NativeBridge</span>
          <span style={{ marginLeft: "12px" }}>
            <a href="/legal/privacy">Privacy</a> · <a href="/legal/terms">Terms</a> · <a href="/legal/support">Support</a>
          </span>
        </footer>
      </div>
    </div>
  );
}