/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Post = require('../models/Post');

module.exports = {
	'index': function(req, res){
		res.view(); return next();
	},

	'find': function(req, res, next){ // index page for posts 
		Post.findAll(function(err, posts){
			if(err)
				return res.send(err, 500);
		});
	},

	'create': function(req, res, next){

		var post = new Post(req.body);

		post.save({
			success: function(){
				res.send(post);
			},
			error: function(error){
				next(err);
			}
		});

	},

	'update': function(req, res, next){
		
	},

	'destroy': function(req, res, next){
		
	}
};
