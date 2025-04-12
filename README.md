
---

### 📁 `Backend/README.md`

```md
# Instagram Login App - Backend

This is the backend server for the Instagram Login MERN project. It handles authentication, access tokens, fetching user data and media from the Instagram Graph API, and posting replies to comments.

## 🚀 Deployed Link

🔗 [Backend API Live](https://backend-instagram-gh7g.onrender.com)

---

## ✨ Features

- Instagram OAuth2 Authentication
- Fetch Instagram profile details
- Get media/feed of the user
- Reply to comments on media

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- Axios
- Instagram Graph API v18.0
- Deployed via **Render**

---


---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
instagramClientId=your_instagram_app_id
instagramClientSecret=your_instagram_app_secret
instagramRedirectUri=https://dhamojiajayapp.netlify.app/instagram/callback
frontendRedirectUri=https://dhamojiajayapp.netlify.app/dashboard


