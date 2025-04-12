const axios = require('axios');
const User = require('../models/userModel');
const config = require('../config/config');

const instagramAuthUrl = 'https://api.instagram.com/oauth/authorize';
const instagramTokenUrl = 'https://api.instagram.com/oauth/access_token';
const instagramGraphApiUrl = 'https://graph.instagram.com/v18.0';

exports.initiateInstagramLogin = (req, res) => {
  const authUrl = `${instagramAuthUrl}?client_id=${config.instagramClientId}&redirect_uri=${config.instagramRedirectUri}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
};

exports.handleInstagramCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Authorization code not provided.');
  }

  try {
    const tokenResponse = await axios.post(instagramTokenUrl, {
      client_id: config.instagramClientId, // Use Instagram Client ID
      client_secret: config.instagramClientSecret, // Use Instagram Client Secret
      grant_type: 'authorization_code',
      redirect_uri: config.instagramRedirectUri,
      code,
    });

    const { access_token, user_id } = tokenResponse.data;

    const profileResponse = await axios.get(`${instagramGraphApiUrl}/${user_id}`, {
      params: {
        fields: 'id,username,name,profile_picture_url',
        access_token,
      },
    });

    const profileData = profileResponse.data;

    let user = await User.findOne({ instagramId: profileData.id });
    if (!user) {
      user = new User({
        instagramId: profileData.id,
        accessToken: access_token,
        profile: profileData,
      });
      await user.save();
    } else {
      user.accessToken = access_token;
      user.profile = profileData;
      await user.save();
    }

    res.redirect(`${config.frontendRedirectUri}?accessToken=${access_token}`);

  } catch (error) {
    console.error('Error during Instagram authentication:', error.response ? error.response.data : error.message);
    res.status(500).send('Failed to authenticate with Instagram.');
  }
};

exports.getUserProfile = async (req, res) => {
  const { accessToken } = req.query;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is required.' });
  }

  try {
    const profileResponse = await axios.get(`${instagramGraphApiUrl}/me`, {
      params: {
        fields: 'id,username,name,profile_picture_url',
        access_token: accessToken,
      },
    });
    res.json(profileResponse.data);
  } catch (error) {
    console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to fetch user profile.' });
  }
};

exports.getUserFeed = async (req, res) => {
  const { accessToken } = req.query;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is required.' });
  }

  try {
    const feedResponse = await axios.get(`${instagramGraphApiUrl}/me/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,permalink,thumbnail_url',
        access_token: accessToken,
      },
    });
    res.json(feedResponse.data.data);
  } catch (error) {
    console.error('Error fetching user feed:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to fetch user feed.' });
  }
};

exports.getPostComments = async (req, res) => {
  const { postId, accessToken } = req.query;

  if (!postId || !accessToken) {
    return res.status(400).json({ message: 'Post ID and access token are required.' });
  }

  try {
    const commentsResponse = await axios.get(`${instagramGraphApiUrl}/${postId}/comments`, {
      params: {
        fields: 'id,text,user',
        access_token: accessToken,
      },
    });
    res.json(commentsResponse.data.data);
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error.response ? error.response.data : error.message);
    res.status(500).json({ message: `Failed to fetch comments for post ${postId}.` });
  }
};

exports.replyToComment = async (req, res) => {
  const { postId, commentId, message, accessToken } = req.body;

  if (!postId || !commentId || !message || !accessToken) {
    return res.status(400).json({ message: 'Post ID, comment ID, message, and access token are required.' });
  }

  try {
    const replyResponse = await axios.post(
      `${instagramGraphApiUrl}/${commentId}/replies`,
      {
        message: message,
      },
      {
        params: {
          access_token: accessToken,
        },
      }
    );
    res.json({ success: true, data: replyResponse.data });
  } catch (error) {
    console.error(`Error replying to comment ${commentId} on post ${postId}:`, error.response ? error.response.data : error.message);
    res.status(500).json({ message: `Failed to reply to comment ${commentId}.` });
  }
};