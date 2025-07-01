-- Initial SQL for local MySQL container
CREATE DATABASE IF NOT EXISTS canvassing;

USE canvassing;

-- Canvassing record table
CREATE TABLE canvassing_record (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create an index on created_at for efficient sorting
CREATE INDEX idx_created_at ON canvassing_record(created_at DESC);
