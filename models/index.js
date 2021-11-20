const UsersModel = require('./users');
const ComplaintsModel = require('./complaints');
const NewsModel = require('./news');
const StatusModel = require('./status');
const CategoriesModel = require('./categories');
const CommentsModel = require('./comments');
const NotesModel = require('./notes');

// create individual files for your models and import them here

module.exports = {
  UsersModel,
  ComplaintsModel,
  NewsModel,
  StatusModel,
  CategoriesModel,
  CommentsModel,
  NotesModel,
};

// Setup Associations

UsersModel.hasMany(ComplaintsModel); // one-to-many association
UsersModel.hasMany(NotesModel); // a single user can have many notes
UsersModel.hasMany(NewsModel); // one-to-many association
UsersModel.hasMany(CommentsModel); // a single user can have many comments

ComplaintsModel.belongsTo(UsersModel); // each complaint belongs to a specific user
ComplaintsModel.hasMany(NotesModel); // each complaint post has many notes

NewsModel.belongsTo(UsersModel); // each news post belonds to a specific user
NewsModel.hasMany(CommentsModel); // each news post has many comments

CommentsModel.belongsTo(NewsModel); // each comment belongs to a specific news post
CommentsModel.belongsTo(UsersModel); // each comment belongs to a specific user

NotesModel.belongsTo(ComplaintsModel); // each note belongs to a specific complaint post
NotesModel.belongsTo(UsersModel); // each note belongs to a specific user
