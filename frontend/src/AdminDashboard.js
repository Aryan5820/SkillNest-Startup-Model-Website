import { useEffect, useState } from "react";

function AdminDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/enroll/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Not authorized as admin");
        }
        return res.json();
      })
      .then(data => {
        setEnrollments(data);
        setLoading(false);
      })
      .catch(error => {
        alert(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading admin data...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📊 Admin Dashboard</h2>
      <p>View all user enrollments</p>

      {enrollments.length === 0 ? (
        <p>No enrollments found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>User Name</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Email</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Course Title</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Description</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Enrolled On</th>
              </tr>
            </thead>
            
            <tbody>
              {enrollments.map(enroll => (
                <tr key={enroll._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {enroll.user?.name || "N/A"}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {enroll.user?.email || "N/A"}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {enroll.course?.title || "N/A"}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {enroll.course?.description || "No description"}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {new Date(enroll.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;