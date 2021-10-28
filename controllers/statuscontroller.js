let router = require('express').Router();
const { StatusModel } = require('../models');
const { validateJWT } = require('../middleware/');

/*
=========================
   CREATE STATUS
=========================
*/

router.post('/', validateJWT, (req, res) => {
  // safe-guard to ensure user has 'admin' privileges
  if (req.user.role !== 'admin') {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }

  const createStatus = { status: req.body.status };

  StatusModel.create(createStatus)
    .then((comment) =>
      res.status(200).json({
        message: 'New status created',
        comment,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'Unable to create status',
        error: err,
      })
    );
});

/*
=========================
   GET ALL STATUS'
=========================
*/

router.get('/', validateJWT, (req, res) => {
  StatusModel.findAll()
    .then((status) => res.status(200).json(status))
    .catch((err) => res.status(500).json({ message: err.message }));
});

/*
=========================
   GET STATUS BY ID
=========================
*/

router.get('/:id', validateJWT, (req, res) => {
  const statusId = req.params.id;

  const query = {
    where: {
      id: statusId,
    },
  };

  StatusModel.findOne(query)
    .then((status) => res.status(200).json(status))
    .catch((err) => res.status(500).json({ message: err.message }));
});

/*
=========================
   UPDATE STATUS BY ID
=========================
*/

router.put('/:id', validateJWT, (req, res) => {
  // safe-guard to ensure user has 'admin' privileges
  if (req.user.role !== 'admin') {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }

  const statusId = req.params.id;

  const updateStatus = { status: req.body.status };

  const query = {
    where: {
      id: statusId,
    },
  };

  StatusModel.update(updateStatus, query)
    .then((status) => {
      res.status(200).json({
        message: 'Status has been updated',
        status,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to update status',
        error: err,
      });
    });
});

/*
=========================
   DELETE STATUS BY ID
=========================
*/

router.delete('/:id', validateJWT, (req, res) => {
  // safe-guard to ensure user has 'admin' privileges
  if (req.user.role !== 'admin') {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }

  const statusId = req.params.id;

  const query = {
    where: {
      id: statusId,
    },
  };

  StatusModel.destroy(query)
    .then((status) => {
      res.status(200).json({
        message: 'Status has been delete',
        status,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to delete status',
        error: err,
      });
    });
});

module.exports = router;
