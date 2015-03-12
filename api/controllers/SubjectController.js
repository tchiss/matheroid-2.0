/**
 * SubjectController
 *
 * @description :: Server-side logic for managing Subjects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res, next){
		var params = req.params.all();

		Subject.create(params, function(err, subject){
			if (err) return next(err);
			res.status(200);
			res.json(subject);
		});
	},

	find: function(req, res, next){
		var id = req.param('id');

		var idShortCut = isShortCut(id);

		if (idShortCut === true) { return next(); }
		if (id) {
			Subject.findOne(id, function(err, subject){
				if (subject === undefined) return res.notFound();
				if (err) return next(err);
				res.json(subject);
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
			Subject.find(options, function(err, subject){
				if (subject === undefined) return res.notFound();
				if (err) return next(err);
				res.json(subject);
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
		Subject.update(id, criteria, function(err, subject){
			if (subject.length === 0) return res.notFound();
			if (err) return next(err);
			res.json(subject);
		});
	},

	destroy: function(req, res, next){
		var id = req.param('id');
		if(!id){
			return res.badRequest('No id provided');
		}
		Subject.findOne(id, function(err, result){
			if (err) return res.serverError(err);
			if (!result) return res.notFound();

			Subject.destroy(id, function(err){
				if (err) next(err);
				res.json(result);
			});
		});
	}
};

