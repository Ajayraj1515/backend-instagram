const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to initiate the Instagram login flow
router.get('/instagram/login', authController.initiateInstagramLogin);

// Callback route that Instagram redirects to after user authorization
router.get('/instagram/callback', authController.handleInstagramCallback);

// Route to fetch the user's profile information (requires access token)
router.get('/user/profile', authController.getUserProfile);

// Route to fetch the user's media feed (requires access token)
router.get('/user/feed', authController.getUserFeed);

// Route to fetch comments for a specific post (requires post ID and access token)
router.get('/posts/:postId/comments', authController.getPostComments);

// Route to reply to a comment on a post (requires post ID, comment ID, message, and access token)
router.post('/posts/:postId/comments/:commentId/replies', authController.replyToComment);

module.exports = router;