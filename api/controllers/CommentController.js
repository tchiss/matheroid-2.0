/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var User = require('../models/User');

module.exports = {
	'read': function(req, res, next){
		User.findOne().then(function(user){
			var comments = Comment.find({userId: User.id}).then(function(comments){
				return comments;
			});
			return [user.id, user.friendsList, comments];
		}).spread(function(userId, friendsList, comments){
	}).catch(function(err){
		console.log(err.message);
	});
	},
	'create': function(req, res, next){

	},

	'update': function(req, res, next){

	},
	'delete': function(req, res, next){

	},

};

