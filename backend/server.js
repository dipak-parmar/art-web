const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
// Note: In production, use environment variables for these values
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'poll_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create table if it doesn't exist
const initDb = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS votes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            answer VARCHAR(10) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Database table initialized');
        }
    });
};

initDb();

// API Endpoints

// POST /vote - Save a vote
app.post('/vote', (req, res) => {
    const { answer } = req.body;

    // Validation
    if (!answer || (answer !== 'yes' && answer !== 'no')) {
        return res.status(400).json({ error: 'Invalid input. Answer must be "yes" or "no".' });
    }

    const query = 'INSERT INTO votes (answer) VALUES (?)';
    db.query(query, [answer], (err, result) => {
        if (err) {
            console.error('Error saving vote:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Vote saved', id: result.insertId });
    });
});

// GET /stats - Get total counts (Extra feature for analytics)
app.get('/stats', (req, res) => {
    const query = 'SELECT answer, COUNT(*) as count FROM votes GROUP BY answer';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching stats:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        const stats = { yes: 0, no: 0 };
        results.forEach(row => {
            stats[row.answer] = row.count;
        });
        
        res.json(stats);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
