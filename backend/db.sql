-- Create Database
CREATE DATABASE IF NOT EXISTS poll_db;
USE poll_db;

-- Create Votes Table
CREATE TABLE IF NOT EXISTS votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    answer VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Query (To count Yes and No votes)
SELECT answer, COUNT(*) as total_votes 
FROM votes 
GROUP BY answer;
