const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = config.port;

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from your frontend
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Mount the authentication routes under the '/auth' path
app.use('/auth', authRoutes);

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});