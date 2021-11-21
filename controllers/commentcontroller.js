let router = require('express').Router();
const { CommentsModel } = require('../models');
const { validateJWT } = require('../middleware/');

/*
=========================
   CREATE COMMENT
=========================
*/

router.post('/:id', validateJWT, (req, res) => {
  console.log('*** User ID **** --->', req.user.id);
  console.log(`*** Username **** ---> ${req.user.fname} ${req.user.lname}`);

  const author = `${req.user.fname} ${req.user.lname}`;

  const createComment = {
    comments: req.body.comments,
    author: author,
    newsId: req.params.id,
    userId: req.user.id,
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
   GET ALL COMMENTS BY NEWS ID
=========================
*/
router.get('/news/:id', (req, res) => {
  const newsId = req.params.id;

  const query = {
    where: {
      newsId: newsId,
    },
  };

  CommentsModel.findAll(query)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ message: err.message }));
});

/*
=========================
   GET COMMENT BY COMMENT ID
=========================
*/
router.get('/:id', (req, res) => {
  const commentId = req.params.id;

  const query = {
    where: {
      id: commentId,
    },
  };

  CommentsModel.findOne(query)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ message: err.message }));
});

/*
=========================
   UPDATE COMMENT BY COMMENT ID
=========================
*/

router.put('/:id', validateJWT, (req, res) => {
  const commentId = req.params.id;

  const updateComment = {
    comments: req.body.comments,
  };

  let query;

  if (req.user.role === 'admin') {
    query = { where: { id: commentId } };
  } else {
    query = { where: { id: commentId, userId: req.user.id } };
  }

  CommentsModel.update(updateComment, query).then((comment) => {
    res
      .status(200)
      .json({
        message: 'Post has been updated',
        comment,
      })
      .catch((err) =>
        res.status(500).json({
          message: 'Unable to update post',
          error: err,
        })
      );
  });
});

/*
=========================
   DELETE COMMENT BY COMMENT ID
=========================
*/

router.delete('/:id', validateJWT, (req, res) => {
  const commentId = req.params.id;

  let query;

  if (req.user.role === 'admin') {
    query = { where: { id: commentId } };
  } else {
    query = { where: { id: commentId, userId: req.user.id } };
  }

  CommentsModel.destroy(query)
    .then((comment) =>
      res.status(200).json({
        message: 'Comment has been deleted',
        comment,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'User does not have privileges to delete comment',
        error: err,
      })
    );
});

module.exports = router;
