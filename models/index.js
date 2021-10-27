const UsersModel = require('./users');
const PostsModel = require('./posts');
const StatusModel = require('./status');
const CategoriesModel = require('./categories');
const CommentsModel = require('./comments');

// create individual files for your models and import them here

module.exports = {
  UsersModel,
  PostsModel,
  StatusModel,
  CategoriesModel,
  CommentsModel,
};

// Setup Associations

UsersModel.hasMany(PostsModel); // one-to-many association
UsersModel.hasMany(CommentsModel); // a single user can have many comments
PostsModel.belongsTo(UsersModel); // each post belongs to a specific user
PostsModel.hasMany(CommentsModel); // each post has many comments
CommentsModel.belongsTo(PostsModel); // each comment belongs to a specific post
CommentsModel.belongsTo(UsersModel); // each comment belongs to a specific user
