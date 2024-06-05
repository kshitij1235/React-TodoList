import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3001;

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define a simple route
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
