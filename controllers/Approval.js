// controllers/approvalController.js
const Approval = require("../models/Approval");
const PullRequest = require("../models/PullRequest");

// Add an approval to a pull request
const addApprovalToPullRequest = async (req, res) => {
  try {
    const { approverId, status } = req.body;
    const pullRequestId = req.params.id;

    // Check if the pull request exists
    const pullRequest = await PullRequest.findById(pullRequestId);
    if (!pullRequest) {
      return res.status(404).json({ message: "Pull request not found." });
    }

    // Check if the approver exists
    // You may want to add more validation here

    // Find the corresponding approval in the pull request
    const existingApproval = pullRequest.approvers.find(
      (approval) => approval.approverId.toString() === approverId
    );

    if (!existingApproval) {
      return res.status(404).json({ message: "Approval not found." });
    }

    // Update existing approval status
    existingApproval.status = status;

    // Check the mode of approval
    if (pullRequest.mode === "Parallel") {
      // Check if all approvers have approved the request
      const allApproved = pullRequest.approvers.every(
        (approval) => approval.status === "Approved"
      );

      // Check if any approver rejects the request
      const anyRejected = pullRequest.approvers.some(
        (approval) => approval.status === "Rejected"
      );

      if (allApproved) {
        pullRequest.status = "Approved";
      } else if (anyRejected) {
        pullRequest.status = "Rejected";
      }
    } else if (pullRequest.mode === "Sequential") {
      // Check if all approvers have approved the request
      const allApproved = pullRequest.approvers.every(
        (approval) => approval.status === "Approved"
      );

      // Check if any approver rejects the request
      const anyRejected = pullRequest.approvers.some(
        (approval) => approval.status === "Rejected"
      );

      if (allApproved) {
        pullRequest.status = "Approved";
      } else if (anyRejected) {
        pullRequest.status = "Rejected";
      }
    }

    // Save the updated pull request
    await pullRequest.save();

    res.status(200).json({ message: "Approval added successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all approvals for a pull request
const getAllApprovalsForPullRequest = async (req, res) => {
  try {
    const pullRequestId = req.params.id;

    // Check if the pull request exists
    const pullRequestExists = await PullRequest.findById(pullRequestId);
    if (!pullRequestExists) {
      return res.status(404).json({ message: "Pull request not found." });
    }

    res.json(pullRequestExists.approvers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addApprovalToPullRequest,
  getAllApprovalsForPullRequest,
};
