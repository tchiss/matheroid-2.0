/**
 * StoriesController
 *
 * @description :: Server-side logic for managing Stories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'index': function(req, res, next){
		// index page 
	},

	'read': function(req, res, next){
		
	},

	'create': function(req, res, next){
		var params = req.params.all();
		Stories.create(params, function(err, stories){
			if (err) return (next);
			res.status(201);
			res.json(stories);
		});
	},

	'update': function(req, res, next){
		
	},

	'destroy': function(req, res, next){
		
	}
};

