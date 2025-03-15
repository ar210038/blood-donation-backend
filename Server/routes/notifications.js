const express = require('express');
const db = require('../../database/mysql');
const router = express.Router();

// Fetch notifications for a donor
router.get('/:donorId', (req, res) => {
  const { donorId } = req.params;
  const query = 'SELECT * FROM notifications WHERE donor_id = ? ORDER BY created_at DESC';
  db.query(query, [donorId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Mark a notification as read
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE notifications SET status = "read" WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update notification' });
    } else {
      res.status(200).json({ message: 'Notification marked as read' });
    }
  });
});

module.exports = router;