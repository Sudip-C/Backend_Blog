const express = require('express');
const { createBlog, getBlogs, likeBlog, dislikeBlog, addComment, addReply } = require('../controllers/blogController');
const router = express.Router();

router.post('/blogs', createBlog);
router.get('/blogs', getBlogs);
router.put('/blogs/:id/like', likeBlog);
router.put('/blogs/:id/dislike', dislikeBlog);
router.post('/blogs/:id/comments', addComment);
router.post('/blogs/:id/comments/:commentId/replies', addReply);

module.exports = router;
