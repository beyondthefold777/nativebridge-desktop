import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubmissionPage from "./pages/SubmissionPage";
import DesktopReviewPage from "./pages/DesktopReviewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/submit" element={<SubmissionPage />} />
        <Route path="/review/:jobId" element={<DesktopReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}
