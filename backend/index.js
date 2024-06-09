const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const DB = {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
  };
  
const db = mysql.createConnection(DB);

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(bodyParser.json());
app.use(cors());

// Retrieve tasks by priority
app.get('/api/tasks/:priority', (req, res) => {
  const priority = req.params.priority;
  const query = 'SELECT * FROM tbltasks WHERE priority = ? AND hide = FALSE ';
  db.query(query, [priority], (err, results) => {
    if (err) {
      console.error('Error retrieving tasks by priority:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Retrieve all priorities
app.get('/api/priority', (req, res) => {
  const query = 'SELECT * FROM tblpriority';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving priorities:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Update task status by task ID
app.put('/api/update_status/:id', (req, res) => {
  const taskId = req.params.id;
  const query = 'UPDATE tbltasks SET status = NOT status WHERE t_id = ?';
  db.query(query, [taskId], (err, results) => {
    if (err) {
      console.error('Error updating task status:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Delete task by task ID
app.delete('/api/delete/task/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = "DELETE FROM tbltasks WHERE t_id = ?";
  db.query(sql, [taskId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Task not found");
    }
    res.send(result);
  });
});

// Delete priority by priority ID
app.delete('/api/delete/priority/:id', (req, res) => {
  const priorityId = req.params.id;
  const sql = "DELETE FROM tblpriority WHERE p_id = ?";
  db.query(sql, [priorityId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Priority not found");
    }
    res.send(result);
  });
});

// Insert a new task
app.post('/api/tasks', (req, res) => {
  const { task, endDate, priority } = req.body;
  const query = 'INSERT INTO tbltasks (task, end_date, priority, status, hide) VALUES (?, ?, ?, 0, 0)';
  db.query(query, [task, endDate, priority], (err, results) => {
    if (err) {
      console.error('Error inserting task:', err);
      res.status(500).send(err);
    } else {
      console.log('Task inserted successfully.');
      console.log('Inserted ID:', results.insertId);
      res.json(results);
    }
  });
});

// Insert a new priority
app.post('/api/priority', (req, res) => {
  const { priority, color } = req.body;
  const query = 'INSERT INTO tblpriority (priority, color) VALUES (?, ?)';
  db.query(query, [priority, color], (err, results) => {
    if (err) {
      console.error('Error inserting priority:', err);
      res.status(500).send(err);
    } else {
      console.log('Priority inserted successfully.');
      console.log('Inserted ID:', results.insertId);
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
