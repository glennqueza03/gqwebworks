import { Analytics } from "@vercel/analytics/react";
import { Navigate, Route, Routes } from "react-router-dom";
import CursorGlow from "./components/CursorGlow.jsx";
import Footer from "./components/Footer.jsx";
import Nav from "./components/Nav.jsx";
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";
import AdminResetPassword from "./pages/AdminResetPassword.jsx";
import Home from "./pages/Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Privacy from "./pages/Privacy.jsx";
import Project from "./pages/Project.jsx";
import Terms from "./pages/Terms.jsx";

export default function App() {
  return (
    <>
      <div className="mesh-bg" aria-hidden="true" />
      <div className="page-grid" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <CursorGlow />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/reset" element={<AdminResetPassword />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <Analytics />
    </>
  );
}
