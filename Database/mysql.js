const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default XAMPP MySQL username
  password: '', // Default XAMPP MySQL password (empty)
  database: 'blood_donation_app', // Your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = connection;