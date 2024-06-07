import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

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

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Retrieve tasks by priority
app.get('/api/tasks/:priority', (req, res) => {
  const priority = req.params.priority;
  const query = 'SELECT * FROM tbltasks WHERE priority = ? AND hide = FALSE';
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
app.get('/api/update_status/:id', (req, res) => {
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


app.delete('/api/delete/task/:id', (req, res) => {
    const taskId = req.params.id;
    // Your logic to delete the task from the database
    // Ensure taskId is properly handled and checked
    // For example:
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




// Insert a new task
app.post('/api/tasks', (req, res) => {
  const { task, endDate, priority } = req.body;
  const query = 'INSERT INTO tbltasks (task, end_date, priority, status) VALUES (?, ?, ?, 0)';
  console.log("adding in task")
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
