

import express from "express";
import {
  createJob,
  getJobs,
  getJobById
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getJobs);
router.get("/:id", getJobById); // 🔥 THIS LINE MUST BE HERE

export default router;




