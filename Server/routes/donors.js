const express = require('express');
const db = require('../../database/mysql');
const router = express.Router();

// Register a new donor
router.post('/', (req, res) => {
  const { name, bloodGroup, location, contact } = req.body;
  const query = `
    INSERT INTO donors (name, blood_group, location, contact)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [name, bloodGroup, location, contact], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to register donor' });
    } else {
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  });
});

// Get all donors
router.get('/', (req, res) => {
  const query = 'SELECT * FROM donors';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch donors' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;