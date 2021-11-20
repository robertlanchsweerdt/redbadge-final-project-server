let router = require('express').Router();
const { NewsModel } = require('../models');
const { validateJWT } = require('../middleware');

/*
=========================
   CREATE NEWS POST
=========================
*/

router.post('/', validateJWT, async (req, res) => {
  const { title, narrative, cal_date, photos } = req.body;

  const postEntry = {
    title,
    narrative,
    cal_date,
    photos,
    userId: req.user.id,
  };

  try {
    await NewsModel.create(postEntry);
    res.status(201).json({
      message: 'News post created',
      postEntry,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
=========================
   GET ALL NEWS POSTS
=========================
*/

router.get('/', (req, res) => {
  NewsModel.findAll()
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ message: err.messge }));
});

/*
=========================
   GET NEWS POST BY ID
=========================
*/

router.get('/:id', validateJWT, (req, res) => {
  const postId = req.params.id;

  const query = {
    where: {
      id: postId,
    },
  };

  NewsModel.findOne(query)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ message: err.messge }));
});

/*
=========================
   UPDATE NEWS POST BY ID
=========================
*/

router.put('/:id', validateJWT, async (req, res) => {
  const postId = req.params.id;

  const { title, narrative, cal_date, photos } = req.body;

  const updatePost = {
    title,
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

  NewsModel.update(updatePost, query)
    .then((post) => {
      res.status(200).json({
        message: 'News post has been updated',
        post,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: 'Unable to update news post',
        error: err,
      })
    );
});

/*
=========================
   DELETE NEWS POST BY ID
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

  NewsModel.destroy(query)
    .then((post) =>
      res.status(200).json({
        message: 'News post has been deleted',
        post,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'User does not have priviledges to delete news post',
        error: err,
      })
    );
});

module.exports = router;
