import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  applyJob,
  getMyApplications,
  getApplicantsByJob,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/apply/:jobId", authMiddleware, applyJob);
router.get("/my", authMiddleware, getMyApplications);
router.get("/job/:jobId", authMiddleware, getApplicantsByJob);
router.put("/:id", authMiddleware, updateApplicationStatus);

export default router;