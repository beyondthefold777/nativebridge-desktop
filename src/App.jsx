import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SubmissionPage from "./pages/SubmissionPage";
import DesktopReviewPage from "./pages/DesktopReviewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Instagram Ads Landing + Business Compliance Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Existing Flows */}
        <Route path="/submit" element={<SubmissionPage />} />
        <Route path="/review/:jobId" element={<DesktopReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}