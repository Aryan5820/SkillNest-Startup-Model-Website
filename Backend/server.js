const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const courseRoutes = require("./routes/course");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("SkillNest API running");
});

// Course routes
app.use("/api/courses", courseRoutes);

// Start server (ALWAYS LAST)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const enrollRoutes = require("./routes/enroll");
app.use("/api/enroll", enrollRoutes);
