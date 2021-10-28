let router = require('express').Router();
const { CategoriesModel } = require('../models');
const { validateJWT } = require('../middleware/');

/*
=========================
   CREATE CATEGORY
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

  const createCategory = { category: req.body.category };

  CategoriesModel.create(createCategory)
    .then((category) =>
      res.status(200).json({
        message: 'New status created',
        category,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'Unable to create category',
        error: err,
      })
    );
});

/*
=========================
   GET ALL CATEGORIES
=========================
*/

router.get('/', validateJWT, (req, res) => {
  CategoriesModel.findAll()
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(500).json({ message: err.message }));
});

/*
=========================
   GET CATEGORY BY ID
=========================
*/

router.get('/:id', validateJWT, (req, res) => {
  const categoryId = req.params.id;

  const query = {
    where: {
      id: categoryId,
    },
  };

  CategoriesModel.findOne(query)
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(500).json({ message: err.message }));
});

/*
=========================
   UPDATE CATEGORY BY ID
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

  const categoryId = req.params.id;

  const updateCategory = { category: req.body.category };

  const query = {
    where: {
      id: categoryId,
    },
  };

  CategoriesModel.update(updateCategory, query)
    .then((category) => {
      res.status(200).json({
        message: 'Category has been updated',
        category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to update category',
        error: err,
      });
    });
});

/*
=========================
   DELETE CATEGORY BY ID
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

  const categoryId = req.params.id;

  const query = {
    where: {
      id: categoryId,
    },
  };

  CategoriesModel.destroy(query)
    .then((category) => {
      res.status(200).json({
        message: 'Category has been delete',
        category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to delete category',
        error: err,
      });
    });
});

module.exports = router;
