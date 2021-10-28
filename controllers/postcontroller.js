let router = require('express').Router();
const { PostsModel } = require('../models');
const { validateJWT } = require('../middleware/');

/*
=========================
   CREATE LOG
=========================
*/

router.post('/', validateJWT, async (req, res) => {
  const {
    title,
    category,
    status,
    has_address,
    street_number,
    street_name,
    city,
    state,
    zip,
    narrative,
    cal_date,
    photos,
  } = req.body;

  const postEntry = {
    title,
    category,
    status,
    has_address,
    street_number,
    street_name,
    city,
    state,
    zip,
    narrative,
    cal_date,
    photos,
    userId: req.user.id,
  };

  try {
    await PostsModel.create(postEntry);
    res.status(201).json({
      message: 'New post created',
      postEntry,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
=========================
   GET ALL POSTS
=========================
*/

router.get('/', (req, res) => {
  PostsModel.findAll()
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ message: err.messge }));
});

/*
=========================
   GET POST BY ID
=========================
*/

router.get('/:id', validateJWT, (req, res) => {
  const postId = req.params.id;

  const query = {
    where: {
      id: postId,
    },
  };

  PostsModel.findOne(query)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ message: err.messge }));
});

/*
=========================
   UPDATE POST BY ID
=========================
*/

router.put('/:id', validateJWT, async (req, res) => {
  const postId = req.params.id;

  const {
    title,
    category,
    status,
    has_address,
    street_number,
    street_name,
    city,
    state,
    zip,
    narrative,
    cal_date,
    photos,
  } = req.body;

  const updatePost = {
    title,
    category,
    status,
    has_address,
    street_number,
    street_name,
    city,
    state,
    zip,
    narrative,
    cal_date,
    photos,
  };

  let query;

  if (req.user.role === 'admin') {
    query = { where: { id: postId } };
  } else {
    query = { where: { id: postId, userId: req.user.id } };
  }

  PostsModel.update(updatePost, query)
    .then((post) => {
      res.status(200).json({
        message: 'Post has been updated',
        post,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: 'Unable to update post',
        error: err,
      })
    );
});

/*
=========================
   DELETE POST BY ID
=========================
*/

router.delete('/:id', validateJWT, (req, res) => {
  const postId = req.params.id;

  let query;

  if (req.user.role === 'admin') {
    query = { where: { id: postId } };
  } else {
    query = { where: { id: postId, userId: req.user.id } };
  }

  PostsModel.destroy(query)
    .then((post) =>
      res.status(200).json({
        message: 'Post has been deleted',
        post,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'User does not have priviledges to delete post',
        error: err,
      })
    );
});

module.exports = router;
