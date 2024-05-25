const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// Endpoint to query the public API and get sheep population
app.get('/sheep/:species', async (req, res) => {
  const species = req.params.species;
  try {
    const response = await axios.get(`https://example.com/api/sheep/${species}`); // Replace with the actual API URL
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sheep population data' });
  }
});

// Endpoint to submit the form
app.post('/', (req, res) => {
  const { name, email, comment } = req.body;
  db.run("INSERT INTO form_responses (name, email, comment) VALUES (?, ?, ?)", [name, email, comment], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to save form response' });
    }
    res.json({ id: this.lastID });
  });
});

// Endpoint to get a specific form response by ID
app.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM form_responses WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve form response' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Form response not found' });
    }
    res.json(row);
  });
});

// Endpoint to get all form responses
app.get('/', (req, res) => {
  db.all("SELECT * FROM form_responses", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve form responses' });
    }
    res.json(rows);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
