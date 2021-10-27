const jwt = require('jsonwebtoken');
const { UsersModel } = require('../models');

const validateSession = async (req, res, next) => {
  // pre-flight request with pinging server
  if (req.method == 'OPTIONS') {
    next();
    // if token authorization provided
  } else if (req.headers.authorization) {
    const { authorization } = req.headers;
    // verify is de-coding
    const payload = authorization
      ? jwt.verify(
          authorization.includes('Bearer')
            ? authorization.split(' ')[1]
            : authorization,
          process.env.JWT_SECRET
        )
      : undefined;

    // begin PAYLOAD if statement
    if (payload) {
      const foundUser = await UsersModel.findOne({
        where: {
          id: payload.id,
        },
      });
      // begin FOUND USER if statement
      if (foundUser) {
        req.user = foundUser;
        next();
      } else {
        res.status(400).send({ message: 'Not authorized' });
      }
      // if PAYLOAD false
    } else {
      res.status(401).send({ messag: 'Invalid token' });
    }
    // user token authorization not provided
  } else {
    res.status(403).send({ message: 'Forbidden' });
  }
};
module.exports = validateSession;
