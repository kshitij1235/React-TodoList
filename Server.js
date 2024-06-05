import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3001;
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(express.json());
app.use(cors());

//#region Retrive query 

app.get('/api/tasks/:priority', (req, res) => {
  console.log('Received request for priority:', req.params.priority);
  const priority = req.params.priority;

  const query = 'SELECT * FROM tbltasks WHERE priority = ?';
  db.query(query, [priority], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM tbltasks', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//#endregion



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
