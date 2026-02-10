import { useState } from "react";
import Courses from "./Courses";
import MyCourses from "./MyCourses";
import AdminDashboard from "./AdminDashboard";

function App() {
  // Simple state to switch between views
  const [view, setView] = useState("courses"); // "courses", "mycourses", "admin"

  return (
    <div style={{ padding: "20px" }}>
      {/* 🔘 NAVIGATION BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        <button 
          onClick={() => setView("courses")}
          style={{ marginRight: "10px", padding: "8px 16px" }}
        >
          📚 All Courses
        </button>
        
        <button 
          onClick={() => setView("mycourses")}
          style={{ marginRight: "10px", padding: "8px 16px" }}
        >
          🎓 My Courses
        </button>
        
        <button 
          onClick={() => setView("admin")}
          style={{ padding: "8px 16px", backgroundColor: "#dc3545", color: "white" }}
        >
          ⚙️ Admin Dashboard
        </button>
      </div>

      <hr />

      {/* 📦 CONDITIONAL RENDERING */}
      {view === "courses" && <Courses />}
      {view === "mycourses" && <MyCourses />}
      {view === "admin" && <AdminDashboard />}
    </div>
  );
}

export default App;