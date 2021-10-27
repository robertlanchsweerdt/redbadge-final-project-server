let router = require('express').Router();
const { CommentsModel } = require('../models');
const { validateJWT } = require('../middleware/');

/*
=========================
   CREATE COMMENT
=========================
*/

router.post('/comments/:id', (req, res) => {
  const postId = req.params.id;

  const createComment = {
    comments: req.body.comments,
    postId,
    userId: '1235',
  };

  CommentsModel.create(createComment)
    .then((comment) =>
      res.status(200).json({
        message: 'Comment added to post',
        comment,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'Unable to add comment to post',
        error: err,
      })
    );
});

/*
=========================
   GET ALL COMMENTS
=========================
*/
router.get('/comments', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*
=========================
   GET COMMENT BY ID
=========================
*/
router.get('/comments:id', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*
=========================
   UPDATE COMMENT BY ID
=========================
*/

router.put('/comments:id', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*
=========================
   DELETE COMMENT BY ID
=========================
*/

router.delete('/comments:id', async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
