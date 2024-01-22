const mongoose = require("mongoose");

const pullRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvers: [
      {
        approverId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
        comments: String,
      },
    ],
    mode: {
      type: String,
      enum: ["Parallel", "Sequential"],
      default: "Parallel",
    },
    status: {
      type: String,
      enum: ["Open", "Approved", "Rejected"],
      default: "Open",
    },
  },
  { timestamps: true }
);

const PullRequest = mongoose.model("PullRequest", pullRequestSchema);
module.exports = PullRequest;
