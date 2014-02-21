// Routes CRUD + Query helper
var mongoose = require("mongoose");

module.exports.query = function(req, res, next, entityModel) {
	var q = null;
	if (req.query.q) { // Query is optional
		try {
			q = JSON.parse(req.query.q);
		} catch (e) {
			res.send(400, "Not a valid JSON Query format");
		}
	}

	entityModel.find(q,
	null, {
		"limit" : req.query.limit && req.query.limit < 101 || 20, // DEFAULT Max: 20, no more than 100 - sets the limit of documents returned in the query.
		"skip"	: req.query.skip || 0 // set to skip N documents ahead in your query (useful for pagination).
	}, function(err, entities) {
		res.send(entities);
	});
}

module.exports.create = function(req, res, next, entityModel) {
	entityModel.create(req.body, function(err, entity) {
		if (err) return next(err);
		res.send(201, entity); // Created
	});
}

module.exports.retrieve = function(req, res, next, entityModel) {
	var objId = null;
	try {
		objId = mongoose.Types.ObjectId(req.params.id);
	} catch (e) {
		console.error("ObjectID is malformed: " + e);
		return res.send(404);
	}

	entityModel.findById(objId, function(err, entity) {
		if (err) return next(err);
		if (entity) {
			res.send(entity);
		} else {
			res.send(404);
		}
	});
}

module.exports.update = function(req, res, next, entityModel) {
	var objId = null;
	try {
		objId = mongoose.Types.ObjectId(req.params.id);
	} catch (e) {
		console.error("ObjectID is malformed: " + e);
		return res.send(404);
	}

	entityModel.findByIdAndUpdate(objId, req.body, {
		"new": true, 		// Return the modified document rather than the original
		"upsert": false 	// Creates the object if does not existss
	}, function(err, entity) {
		if (err) return next(err);
		res.send(entity);
	});
}

module.exports.delete = function(req, res, next, entityModel) {
	var objId = null;
	try {
		objId = mongoose.Types.ObjectId(req.params.id);
	} catch (e) {
		console.error("ObjectID is malformed: " + e);
		return res.send(404);
	}

	entityModel.findByIdAndRemove(objId, function(err, entity) {
		if (err) return next(err);
		if (entity) {
			res.send(entity);
		} else {
			res.send(404);
		}
	});
}