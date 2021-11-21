let router = require('express').Router();
const { ComplaintsModel } = require('../models');
const { validateJWT } = require('../middleware');

/*
=========================
   CREATE COMPLAINT
=========================
*/

router.post('/', validateJWT, async (req, res) => {
  const { category, status, address, city, state, zip, narrative, photos } =
    req.body;

  const author = `${req.user.fname} ${req.user.lname}`;

  const complaintEntry = {
    category,
    status,
    address,
    city,
    state,
    zip,
    narrative,
    photos,
    author: author,
    userId: req.user.id,
  };

  try {
    await ComplaintsModel.create(complaintEntry);
    res.status(201).json({
      message: 'New complaint created',
      complaintEntry,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
=========================
   GET ALL COMPLAINTS
=========================
*/

router.get('/', (req, res) => {
  ComplaintsModel.findAll()
    .then((complaint) => res.status(200).json(complaint))
    .catch((err) => res.status(500).json({ message: err.messge }));
});

/*
=========================
   GET COMPLAINT BY ID
=========================
*/

router.get('/:id', validateJWT, (req, res) => {
  const complaintId = req.params.id;

  const query = {
    where: {
      id: complaintId,
    },
  };

  ComplaintsModel.findOne(query)
    .then((complaint) => res.status(200).json(complaint))
    .catch((err) => res.status(500).json({ message: err.messge }));
});

/*
=========================
   UPDATE COMPLAINT BY ID
=========================
*/

router.put('/:id', validateJWT, async (req, res) => {
  const complaintId = req.params.id;

  const { category, status, address, city, state, zip, narrative, photos } =
    req.body;

  const updateComplaint = {
    category,
    status,
    address,
    city,
    state,
    zip,
    narrative,
    photos,
  };

  let query;

  if (req.user.role === 'admin') {
    query = { where: { id: complaintId } };
  } else {
    query = { where: { id: complaintId, userId: req.user.id } };
  }

  ComplaintsModel.update(updateComplaint, query)
    .then((complaint) => {
      res.status(200).json({
        message: 'Complaint has been updated',
        complaint,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: 'Unable to update complaint',
        error: err,
      })
    );
});

/*
=========================
   DELETE COMPLAINT BY ID
=========================
*/

router.delete('/:id', validateJWT, (req, res) => {
  const complaintId = req.params.id;

  let query;

  if (req.user.role === 'admin') {
    query = { where: { id: complaintId } };
  } else {
    query = { where: { id: complaintId, userId: req.user.id } };
  }

  ComplaintsModel.destroy(query)
    .then((complaint) =>
      res.status(200).json({
        message: 'Complaint has been deleted',
        complaint,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'User does not have priviledges to delete complaint',
        error: err,
      })
    );
});

module.exports = router;
