const express = require("express");
const {
  createPullRequest,
  getAllPullRequests,
  getPullRequestById,
  updatePullRequestById,
  deletePullRequestById,
} = require("../controllers/PullRequest");
const {
  getAllApprovalsForPullRequest,
  addApprovalToPullRequest,
} = require("../controllers/Approval");
const {
  getAllCommentsForPullRequest,
  addCommentToPullRequest,
} = require("../controllers/Comment");
const router = express.Router();

// get all approvals
router.get("/:id/approvals", getAllApprovalsForPullRequest);

// add approval
router.post("/:id/approvals", addApprovalToPullRequest);

// get comments
router.get("/:id/comments", getAllCommentsForPullRequest);

// add comments
router.post("/:id/comments", addCommentToPullRequest);

// Create a new pull request
router.post("/", createPullRequest);

// Get all pull requests
router.get("/", getAllPullRequests);

// Get a specific pull request by ID
router.get("/:id", getPullRequestById);

// Update a pull request by ID
router.put("/:id", updatePullRequestById);

// Delete a pull request by ID
router.delete("/:id", deletePullRequestById);

module.exports = router;
