// controllers/pullRequestController.js
const PullRequest = require("../models/PullRequest");

// Create a new pull request
const createPullRequest = async (req, res) => {
  try {
    const { title, description, requesterId, approvers } = req.body;

    const pullRequest = new PullRequest({
      title,
      description,
      requesterId,
      approvers,
    });

    const savedPullRequest = await pullRequest.save();

    res.status(201).json(savedPullRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all pull requests
const getAllPullRequests = async (req, res) => {
  try {
    const pullRequests = await PullRequest.find();
    res.json(pullRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific pull request by ID
const getPullRequestById = async (req, res) => {
  try {
    const pullRequest = await PullRequest.findById(req.params.id);
    if (!pullRequest) {
      return res.status(404).json({ message: "Pull request not found." });
    }
    res.json(pullRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a pull request by ID
const updatePullRequestById = async (req, res) => {
  try {
    const { title, description, approvers } = req.body;

    const existingPullRequest = await PullRequest.findById(req.params.id);
    if (!existingPullRequest) {
      return res.status(404).json({ message: "Pull request not found." });
    }

    existingPullRequest.title = title;
    existingPullRequest.description = description;
    existingPullRequest.approvers = approvers;

    const updatedPullRequest = await existingPullRequest.save();

    res.json(updatedPullRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a pull request by ID
const deletePullRequestById = async (req, res) => {
  try {
    const pullRequest = await PullRequest.findById(req.params.id);
    if (!pullRequest) {
      return res.status(404).json({ message: "Pull request not found." });
    }

    await pullRequest.remove();
    res.json({ message: "Pull request deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPullRequest,
  getAllPullRequests,
  getPullRequestById,
  updatePullRequestById,
  deletePullRequestById,
};
