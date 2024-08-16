const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  replies: [
    {
      user: { type: String },
      text: { type: String },
      date: { type: Date, default: Date.now },
    }
  ],
  date: { type: Date, default: Date.now }
});

const blogSchema = new Schema({
  id:{ type: String, unique: true, required: true  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  comments: [commentSchema],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
