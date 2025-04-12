const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  instagramId: { type: String, unique: true }, // Unique Instagram user ID
  accessToken: String, // Access token obtained from Instagram
  profile: {
    id: String,
    username: String,
    name: String,
    profile_picture_url: String,
    // Add other relevant profile fields as needed, based on the Instagram API response
  },
});

module.exports = mongoose.model('User', userSchema);