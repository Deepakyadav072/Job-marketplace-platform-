import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  budget: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  timeline: {
    type: String
  },

  requirements: {
    type: String
  },

  skills: [
    {
      type: String
    }
  ],

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{ timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;