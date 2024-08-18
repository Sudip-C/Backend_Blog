const Blog = require('../models/blog');
const { v4: uuidv4 } = require('uuid');

// Create a new blog
exports.createBlog = async (req, res) => {
  const { title, description } = req.body;
  try {
      const blog = new Blog({id:uuidv4(), title, description, authorId: req.user.userId });
      await blog.save();
      res.status(201).json(blog);
  } catch (error) {
      res.status(500).json({ message: 'Error creating blog', error });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Like a blog
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.likes += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Dislike a blog
exports.dislikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.dislikes += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.comments.push(req.body);
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add reply to comment
exports.addReply = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const comment = blog.comments.id(req.params.commentId);
    comment.replies.push(req.body);
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get blog by user

exports.getBlogsByUser = async (req, res) => {
  try {
      const blogs = await Blog.find({ authorId: req.user.userId });
      res.json(blogs);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

//update a blog
exports.updateBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
      const blog = await Blog.findOneAndUpdate({ _id: blogId, authorId: req.user.userId }, req.body, { new: true });
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      res.json(blog);
  } catch (error) {
      res.status(500).json({ message: 'Error updating blog', error });
  }
};

// delete a blog
exports.deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
      const blog = await Blog.findOneAndDelete({ _id: blogId, authorId: req.user.userId });
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
      res.json({ message: 'Blog deleted' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting blog', error });
  }
};