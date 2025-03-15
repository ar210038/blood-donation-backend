const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Import routes
const donorRoutes = require('./routes/donors');
const requestRoutes = require('./routes/requests');
const notificationRoutes = require('./routes/notifications');

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies

// Use routes
app.use('/api/donors', donorRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', notificationRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Blood Donation App API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});