-- Initial SQL for local MySQL container
CREATE DATABASE IF NOT EXISTS canvassing;

USE canvassing;

-- Canvassing notes table
CREATE TABLE canvassing_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create an index on created_at for efficient sorting
CREATE INDEX idx_created_at ON canvassing_notes(created_at DESC);
