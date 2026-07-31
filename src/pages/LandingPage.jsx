import React from "react";
import "../App.css";

const APP_URL = "https://play.google.com/store/apps/details?id=com.sylo777.nativebridgeproject";

export default function LandingPage() {
  return (
    <div className="app-root">
      <div className="app-bg" />
      <div className="app-shell">
        <header className="app-header">
          {/* NB LOGO - NOW SAME GRADIENT AS BADGE */}
          <div 
            className="logo-circle" 
            style={{
              background: "linear-gradient(90deg, #00bfff, #0077ff)",
              color: "#000",
              fontWeight: 800
            }}
          >
            NB
          </div>
          <div className="header-text">
            <h1>NativeBridge</h1>
            <p>Marketplace for Tech Work — Official Business Page</p>
          </div>
        </header>

        <main className="card">
          <span style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #00bfff, #0077ff)",
            color: "#000", 
            padding: "6px 12px", 
            borderRadius: "999px",
            fontWeight: 700, 
            fontSize: "13px", 
            marginBottom: "20px"
          }}>Official Business Page</span>

          <h2 className="card-title" style={{ fontSize: "36px", fontWeight: 800, marginBottom: "10px" }}>
            NativeBridge
          </h2>
          <p className="card-subtitle">
            NativeBridge is a marketplace platform that connects clients with independent tech professionals for short-term and on-demand digital work.
          </p>

          {/* APP URL - HIGH VISIBILITY */}
          <div className="info-box" style={{ marginTop: "20px", border: "1px solid #00bfff" }}>
            <strong style={{ display: "block", marginBottom: "8px" }}>Official App URL – Google Play:</strong>
            <div className="mono" style={{ 
              background: "#000", 
              border: "1px solid #222", 
              padding: "12px", 
              borderRadius: "10px",
              wordBreak: "break-all"
            }}>
              <a href={APP_URL} style={{ color: "#00bfff" }}>{APP_URL}</a>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
            <a href={APP_URL} className="primary-btn" style={{ textDecoration: "none" }}>
              Get it on Google Play →
            </a>
            <a href={APP_URL} className="ghost-btn" style={{ textDecoration: "none" }}>
              Open App
            </a>
          </div>

          <div className="info-box" style={{ marginTop: "32px" }}>
            <h3 className="card-title" style={{ fontSize: "22px", marginBottom: "10px" }}>What We Do</h3>
            <p className="card-subtitle small">
              Clients post technical jobs such as software development, IT support, and digital services. Workers accept jobs, complete the work, and submit deliverables through the platform.
            </p>
          </div>

          <div className="info-box" style={{ marginTop: "16px" }}>
            <h3 className="card-title" style={{ fontSize: "22px", marginBottom: "10px" }}>How Payments Work</h3>
            <p className="card-subtitle small">
              Payments are authorized when a worker accepts a job and are held securely until work is submitted and approved by the client. If a dispute is opened, payments are paused until the issue is resolved.
            </p>
          </div>

          <div className="info-box" style={{ marginTop: "16px" }}>
            <h3 className="card-title" style={{ fontSize: "22px", marginBottom: "10px" }}>Platform Access</h3>
            <p className="card-subtitle small">
              NativeBridge is primarily offered as a mobile application. This page serves as the public business landing page for payment processing and compliance purposes. Access the app: <a href={APP_URL} className="accent">Google Play Store</a>.
            </p>
          </div>

          <div className="info-box" style={{ marginTop: "16px" }}>
            <h3 className="card-title" style={{ fontSize: "22px", marginBottom: "10px" }}>Contact</h3>
            <p className="card-subtitle small">
              Support Email: <a href="mailto:support@nativebridgeproject.com" className="accent">support@nativebridgeproject.com</a><br/>
              App URL: <a href={APP_URL} className="accent">{APP_URL}</a>
            </p>
          </div>
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} NativeBridge. All rights reserved.</span>
          <span style={{ marginLeft: "12px" }}>
            <a href="/legal/privacy">Privacy</a> · <a href="/legal/terms">Terms</a> · <a href="/legal/support">Support</a>
          </span>
        </footer>
      </div>
    </div>
  );
}