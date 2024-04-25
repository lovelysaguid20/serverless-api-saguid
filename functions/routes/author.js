const express = require("express");
const authormodel = require("models/author");
const router = express.Router();

// GET all authors
router.get("/", async (req, res) => {
  try {
    const authors = await authorModel.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single author
router.get("/:id", getAuthor, (req, res) => {
  res.json(res.author);
});

module.exports = router;

// CREATE an author
router.post('/', async (req, res) => {
    try {
      // Validate request body
      if (!req.body.name || !req.body.age) {
        return res.status(400).json({ message: 'Name and age are required' });
      }
  
      // Check if the author's name already exists
      const existingAuthor = await AuthorModel.findOne({ name: req.body.name });
  
      if (existingAuthor) {
        return res.status(400).json({ message: 'Author already exists' });
      }
  
      // Create a new author
      const author = new AuthorModel(req.body);
      const newAuthor = await author.save();
  
      res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  
  // DELETE an author
router.delete('/:id', getAuthor, async (req, res) => {
    try {
      await AuthorModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Author deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Middleware function to get a single author by ID
  async function getAuthor(req, res, next) {
    try {
      const author = await AuthorModel.findById(req.params.id);
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.author = author;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  