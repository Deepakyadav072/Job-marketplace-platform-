import Application from "../models/Application.js";

// 🔥 APPLY JOB
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { proposal } = req.body;

    const existing = await Application.findOne({
      job: jobId,
      user: req.user.id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const app = await Application.create({
      job: jobId,
      user: req.user.id,
      proposal,
    });

    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔥 MY APPLICATIONS (freelancer)
export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      user: req.user.id,
    }).populate("job");

    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔥 GET APPLICANTS (client)
export const getApplicantsByJob = async (req, res) => {
  try {
    const apps = await Application.find({
      job: req.params.jobId,
    }).populate("user");

    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔥 ACCEPT / REJECT (FINAL FIX)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    const app = await Application.findById(applicationId);

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (status === "Accepted") {
      // ❗ reject all others
      await Application.updateMany(
        { job: app.job },
        { status: "Rejected" }
      );

      app.status = "Accepted";
      await app.save();
    } else {
      app.status = status;
      await app.save();
    }

    res.json(app);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};