const Blog = require('../models/blog');

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog({
        ...req.body,
        id: uuidv4() 
      });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
