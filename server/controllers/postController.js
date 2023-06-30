const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const PER_PAGE = 20;
// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const offset = (page - 1) * PER_PAGE;

  const posts = await Post.findAll({
    limit: PER_PAGE,
    offset: offset,
  });

  res.status(200).json({
    message: "Success",
    posts: posts,
  });
});

module.exports = {
  getPosts,
};
