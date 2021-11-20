let router = require('express').Router();
const { NotesModel } = require('../models');
const { validateJWT } = require('../middleware');

/*
=========================
   CREATE NOTE
=========================
*/

router.post('/:id', validateJWT, (req, res) => {
  console.log('*** User ID **** --->', req.user.id);

  const createNote = {
    notes: req.body.notes,
    complaintId: req.params.id,
    userId: req.user.id,
  };

  NotesModel.create(createNote)
    .then((note) =>
      res.status(200).json({
        message: 'Note added to complaint',
        note,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'Unable to add note to complaint',
        error: err,
      })
    );
});

/*
=========================
   GET ALL NOTES BY COMPLAINT POST ID
=========================
*/
router.get('/complaints/:id', (req, res) => {
  const complaintId = req.params.id;

  const query = {
    where: {
      complaintId: complaintId,
    },
  };

  NotesModel.findAll(query)
    .then((notes) => res.status(200).json(notes))
    .catch((err) => res.status(500).json({ message: err.message }));
});

/*
=========================
   GET NOTE BY NOTE ID
=========================
*/
router.get('/:id', (req, res) => {
  const noteId = req.params.id;

  const query = {
    where: {
      id: noteId,
    },
  };

  NotesModel.findOne(query)
    .then((note) => res.status(200).json(note))
    .catch((err) => res.status(500).json({ message: err.message }));
});

/*
=========================
   UPDATE NOTE BY NOTE ID
=========================
*/

router.put('/:id', validateJWT, (req, res) => {
  const noteId = req.params.id;

  const updateNote = {
    notes: req.body.notes,
  };

  let query;

  if (req.user.role === 'admin') {
    query = { where: { id: noteId } };
  } else {
    query = { where: { id: noteId, userId: req.user.id } };
  }

  NotesModel.update(updateNote, query).then((note) => {
    res
      .status(200)
      .json({
        message: 'Note has been updated',
        note,
      })
      .catch((err) =>
        res.status(500).json({
          message: 'Unable to update note',
          error: err,
        })
      );
  });
});

/*
=========================
   DELETE NOTE BY NOTE ID
=========================
*/

router.delete('/:id', validateJWT, (req, res) => {
  const noteId = req.params.id;

  let query;

  if (req.user.role === 'admin') {
    query = { where: { id: noteId } };
  } else {
    query = { where: { id: noteId, userId: req.user.id } };
  }

  NotesModel.destroy(query)
    .then((note) =>
      res.status(200).json({
        message: 'Note has been deleted',
        note,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'User does not have privileges to delete note',
        error: err,
      })
    );
});

module.exports = router;
