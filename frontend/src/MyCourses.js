import { useEffect, useState } from "react";

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/enroll/my", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setEnrollments(data));
  }, []);

  return (
    <div>
      <h2>My Enrolled Courses</h2>

      {enrollments.length === 0 && <p>No courses enrolled yet.</p>}

      {enrollments.map(enroll => (
        <div key={enroll._id}>
          <h3>{enroll.course.title}</h3>
          <p>{enroll.course.description}</p>
        </div>
      ))}
    </div>
  );
}

export default MyCourses;
