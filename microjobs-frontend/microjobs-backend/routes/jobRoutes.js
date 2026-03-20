import Job from "../models/Job.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id   // 🔥 important
    });

    res.status(201).json(job);

  } catch (error) {
    res.status(500).json({ message: "Error creating job" });
  }
};

// GET ALL JOBS (for freelancers)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email");

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

// ✅ GET MY JOBS (CLIENT)
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: req.user.id
    }).populate("postedBy", "name email");

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ message: "Error fetching my jobs" });
  }
};

// GET JOB BY ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);

  } catch (error) {
    res.status(500).json({ message: "Error fetching job" });
  }
};

// Routes
router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/my", authMiddleware, getMyJobs);
router.get("/:id", getJobById);

export default router;