require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  instagramClientId: process.env.INSTAGRAM_CLIENT_ID,
  instagramClientSecret: process.env.INSTAGRAM_CLIENT_SECRET, // Add this
  instagramRedirectUri: process.env.INSTAGRAM_REDIRECT_URI || 'http://localhost:5000/auth/instagram/callback',
  frontendRedirectUri: process.env.FRONTEND_REDIRECT_URI || 'http://localhost:3000/dashboard',
};