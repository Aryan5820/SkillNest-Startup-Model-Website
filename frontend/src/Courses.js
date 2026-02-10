import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]); // ✅ STEP 9.7.1

  // 🔹 ENROLL FUNCTION
  const enrollCourse = async (courseId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to enroll");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/enroll/${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    alert(data.message);

    // ✅ Update UI immediately after enroll
    if (res.ok) {
      setEnrolledIds([...enrolledIds, courseId]);
    }
  };

  // 🔹 FETCH COURSES + ENROLLED COURSES
  useEffect(() => {
    // Get all courses
    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data));

    // Get enrolled courses (for disabling button)
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/enroll/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          const ids = data.map(e => e.course._id);
          setEnrolledIds(ids);
        });
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Courses</h2>

      {courses.map(course => (
        <div
          key={course._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px"
          }}
        >
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          {/* ✅ STEP 9.7.1 BUTTON LOGIC */}
          <button
            onClick={() => enrollCourse(course._id)}
            disabled={enrolledIds.includes(course._id)}
          >
            {enrolledIds.includes(course._id)
              ? "Enrolled"
              : "Enroll"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Courses;
