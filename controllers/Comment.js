// controllers/commentController.js
const Comment = require("../models/Comment");
const PullRequest = require("../models/PullRequest");

// Add a comment to a pull request
const addCommentToPullRequest = async (req, res) => {
  try {
    const { comment, userId } = req.body;
    const pullRequestId = req.params.id;

    // Check if the pull request exists
    const pullRequestExists = await PullRequest.findById(pullRequestId);
    if (!pullRequestExists) {
      return res.status(404).json({ message: "Pull request not found." });
    }

    const newComment = new Comment({
      userId,
      pullRequestId,
      comment,
    });

    // pullRequestExists.comments.push(newComment);
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all comments for a pull request
const getAllCommentsForPullRequest = async (req, res) => {
  try {
    const pullRequestId = req.params.id;

    // Check if the pull request exists
    const pullRequestExists = await PullRequest.findById(pullRequestId);
    if (!pullRequestExists) {
      return res.status(404).json({ message: "Pull request not found." });
    }

    const comments = await Comment.find({ pullRequestId })
      .select("userId pullRequestId comment")
      .populate({
        path: "userId",
        select: "-password", // Exclude the 'password' field
      });

    res.send(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addCommentToPullRequest,
  getAllCommentsForPullRequest,
};
