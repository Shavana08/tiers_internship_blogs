const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { connection } = require('../database/sql');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Correct path to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});


const upload = multer({ storage: storage });

// Create a new blog
router.post('/', upload.single('coverImage'), (req, res) => {
  const { title, content } = req.body;
  const coverImage = req.file ? req.file.filename : null;
  
  connection.query('INSERT INTO blogs (title, content, coverImage) VALUES (?, ?, ?)', [title, content, coverImage], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Blog created successfully' });
  });
});

// Get all blogs
router.get('/', (req, res) => {
  connection.query('SELECT * FROM blogs', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Delete a blog by ID
router.delete('/:id', (req, res) => {
  const blogId = req.params.id;
  connection.query('DELETE FROM blogs WHERE id = ?', [blogId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  });
});

module.exports = router;
