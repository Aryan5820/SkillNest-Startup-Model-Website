const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const { protect } = require("../middleware/authMiddleware");


router.post("/:courseId", protect, async (req, res) => {
  try {
    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = new Enrollment({
      user: req.user._id,
      course: req.params.courseId
    });

    await enrollment.save();
    res.status(201).json({ message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed" });
  }
});

router.get("/my", protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate("course");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});


module.exports = router;
