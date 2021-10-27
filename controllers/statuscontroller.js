let router = require('express').Router();
const { StatusModel } = require('../models');
const { validateJWT } = require('../middleware/');

router.post('/status', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/status', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/status:id', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put('/status:id', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
