const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, admin, async (req, res) => {
  const { title, description } = req.body;

  try {
    const course = new Course({
      title,
      description
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course" });
  }
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

router.put("/:id", protect, admin, async (req, res) => {
  const { title, description } = req.body;

  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.title = title || course.title;
    course.description = description || course.description;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to update course" });
  }
});
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
});
module.exports = router;


