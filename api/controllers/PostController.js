/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res, next){
		var params = req.params.all();

		Post.create(params, function(err, post){
			if (err) return next(err);
			res.status(200);
			res.json(post);
		});
	},

	find: function(req, res, next){
		var id = req.param('id');

		var idShortCut = isShortCut(id);

		if (idShortCut === true) { return next(); }
		if (id) {
			Post.findOne(id, function(err, post){
				if (post === undefined) return res.notFound();
				if (err) return next(err);
				res.json(post);
			});
		} else {
			var where = req.param('where');
			if (_.isString(where)){
				where = JSON.parse(where);
			}
			var options = {
				limit:  req.param('limit') || undefined,
				skip: req.param('skip') || undefined,
				sort: req.param('sort') || undefined,
				where: where || undefined
			};

			console.log("This is the options", options);
			Post.find(options, function(err, post){
				if (post === undefined) return res.notFound();
				if (err) return next(err);
				res.json(post);
			});
		}
		function isShortCut(id){
			if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy'){
				return true;
			}
		}
	},

	update: function(req, res, next){
		var criteria = {};

		criteria = _.merge({}, req.params.all(), req.body);
		var id = req.param('id');

		if(!id){
			return res.badRequest('No id provided');
		}
		Post.update(id, criteria, function(err, post){
			if (post.length === 0) return res.notFound();
			if (err) return next(err);
			res.json(post);
		});
	},

	destroy: function(req, res, next){
		var id = req.param('id');
		if(!id){
			return res.badRequest('No id provided');
		}
		Post.findOne(id, function(err, result){
			if (err) return res.serverError(err);
			if (!result) return res.notFound();

			Post.destroy(id, function(err){
				if (err) next(err);
				res.json(result);
			});
		});
	}
};

