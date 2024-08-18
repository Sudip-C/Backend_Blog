const express = require('express');
const authMiddleware=require('../middlewares/authMiddleware')
const { createBlog, getBlogs, likeBlog, dislikeBlog, addComment, addReply,
     getBlogsByUser, updateBlog, deleteBlog} = require('../controllers/blogController');
const router = express.Router();

router.post('/blogs', authMiddleware, createBlog);
router.get('/blogs', getBlogs);
router.put('/blogs/:id/like', likeBlog);
router.put('/blogs/:id/dislike', dislikeBlog);
router.post('/blogs/:id/comments', authMiddleware, addComment);
router.post('/blogs/:id/comments/:commentId/replies', authMiddleware, addReply);
router.get('/Userblogs', authMiddleware, getBlogsByUser);
router.put('/blogs/:blogId', authMiddleware, updateBlog);
router.delete('/blogs/:blogId', authMiddleware, deleteBlog);

module.exports = router;
