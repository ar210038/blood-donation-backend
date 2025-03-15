const express = require('express');
const db = require('../../database/mysql');
const router = express.Router();

// Submit a blood request
router.post('/', (req, res) => {
  const { name, bloodGroup, location, contact, urgency } = req.body;
  const query = `
    INSERT INTO requests (name, blood_group, location, contact, urgency)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [name, bloodGroup, location, contact, urgency], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to submit request' });
    } else {
      const requestId = result.insertId;

      // Find matching donors
      const findDonorsQuery = 'SELECT * FROM donors WHERE blood_group = ? AND availability = TRUE';
      db.query(findDonorsQuery, [bloodGroup], (err, donors) => {
        if (err) {
          res.status(500).json({ error: 'Failed to find matching donors' });
        } else {
          // Send notifications to matching donors
          donors.forEach((donor) => {
            const message = `New blood request: ${name} needs ${bloodGroup} blood at ${location}. Urgency: ${urgency}. Contact: ${contact}`;
            const insertNotificationQuery = `
              INSERT INTO notifications (donor_id, request_id, message)
              VALUES (?, ?, ?)
            `;
            db.query(insertNotificationQuery, [donor.id, requestId, message], (err) => {
              if (err) {
                console.error('Failed to send notification to donor:', donor.id);
              }
            });
          });

          res.status(201).json({ id: requestId, ...req.body });
        }
      });
    }
  });
});

// Get all requests
router.get('/', (req, res) => {
  const query = 'SELECT * FROM requests';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch requests' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;