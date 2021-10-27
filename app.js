require('dotenv').config();
const Express = require('express');
const db = require('./db');

const app = Express();

// Import middlewares as a bundle
const middlewares = require('./middleware');

// Import controllers as a bundle
const controllers = require('./controllers');
const { reset } = require('nodemon');

// Parse the body of all requests as JSON
app.use(Express.json());
app.use(middlewares.CORS);
app.use('/user', controllers.userController);
app.use('/post', controllers.postController);
app.use('/status', controllers.statusController);
app.use('/category', controllers.categoryController);
app.use('/comment', controllers.commentController);

const resetDatabase = { force: true };
db.authenticate()
  // add a resetDatabase inside the db.sync to drop all your tables if needed
  // example:  .then(() => db.sync(resetDatabase))
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.error('[server]: Server Crashed');
    console.error(e);
  });
