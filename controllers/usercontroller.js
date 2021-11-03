const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let router = require('express').Router();
const { UsersModel, PostsModel } = require('../models');
const { validateJWT } = require('../middleware/');
const { UniqueConstraintError } = require('sequelize');

/*
=========================
   REGISTER USER
=========================
*/
router.post('/register', async (req, res) => {
  const {
    username,
    password,
    fname,
    lname,
    address,
    city,
    state,
    zip,
    tele,
    email,
    role,
    bio,
  } = req.body;

  try {
    await UsersModel.create({
      username,
      password: bcrypt.hashSync(password, 13),
      fname,
      lname,
      address,
      city,
      state,
      zip,
      tele,
      email,
      role,
      bio,
    }).then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(201).json({
        message: 'New user registered',
        user: user,
        sessionToken: `Bearer ${token}`,
      });
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: 'Username already in use',
      });
    } else {
      res.status(500).json({
        message: 'Unable to register user',
        error: err.message,
      });
    }
  }
});

/*
=========================
   LOGIN USER
=========================
*/

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // find username in table
    await UsersModel.findOne({
      where: {
        username,
      },
    })
      // does user and password match data stored in table
      .then((user) => {
        // if findOne() username is true, then compare password
        if (user) {
          bcrypt.compare(password, user.password, (err, matches) => {
            // check if password matches is true, then set token
            if (matches) {
              const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });
              res.json({
                user,
                message: 'User successfully logged in',
                sessionToken: `Bearer ${token}`,
              });
              // password match is false then give status message
            } else {
              res
                .status(401)
                .send({ message: 'Username or Password is incorrect' });
            }
          });
          // findOne() username is false then give status message
        } else {
          res
            .status(401)
            .json({ message: 'Username or Password is incorrect' });
        }
      });
    // problem connecting to server
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
});

/*
=========================
   GET ALL USERS
=========================
*/

router.get('/', validateJWT, async (req, res) => {
  try {
    await UsersModel.findAll().then((users) => res.status(200).json(users));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
=========================
   GET USER INFO BY ID
=========================
*/

router.get('/:id', validateJWT, (req, res) => {
  const userId = req.params.id;

  const query = {
    where: {
      id: userId,
    },
  };

  UsersModel.findOne(query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ messge: err.messge }));
});

/*
=========================
   UPDATE USER INFO BY ID
=========================
*/

router.put('/:id', validateJWT, (req, res) => {
  const userId = req.params.id;

  const {
    username,
    password,
    fname,
    lname,
    address,
    city,
    state,
    zip,
    tele,
    email,
    role,
    bio,
  } = req.body;

  const updateUser = {
    username,
    password,
    fname,
    lname,
    address,
    city,
    state,
    zip,
    tele,
    email,
    role,
    bio,
  };

  if (updateUser.password) {
    updateUser.password = bcrypt.hashSync(updateUser.password, 13);
  }

  let query;

  if (req.user.role === 'admin') {
    query = { where: { id: userId } };
  } else if (req.user.id === userId) {
    query = { where: { id: userId, userId: req.user.id } };
  }

  UsersModel.update(updateUser, query)
    .then((user) =>
      res.status(200).json({
        message: 'User successfully updated',
        user,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: 'User does not have privileges to edit user',
        error: err,
      })
    );
});

/*
=========================
   DELETE USER INFO BY ID
=========================
*/

router.delete('/:id', validateJWT, (req, res) => {
  const userId = req.params.id;

  const query = {
    where: {
      id: userId,
    },
  };

  UsersModel.destroy(query)
    .then((user) =>
      res.status(200).json({
        message: 'User deleted',
        user,
      })
    )
    .catch((err) => res.status(500).json({ message: err.messge }));
});

module.exports = router;
