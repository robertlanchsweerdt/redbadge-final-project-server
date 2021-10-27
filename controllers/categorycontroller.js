let router = require('express').Router();
const { CategoriesModel } = require('../models');
const { validateJWT } = require('../middleware/');

router.post('/category', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/category', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/category:id', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put('/category:id', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
