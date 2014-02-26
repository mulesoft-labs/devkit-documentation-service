// Routes CRUD + Query helper
var mongoose = require("mongoose");

/*
 * SQL Defined in JSON: 
 * { "criteria": { "firstname" : {"&eq;" : "gustavo"} }, "limit" : 20, "skip" : 20, "fields" : "firstname lastname email"}
 *
 * criteria: contains the json that will be used by the mongoose model to query
 * limit: contains the number of elements per page // No more than 100 allowed
 * skip: contains the number of elements to skip in the cursor to where start reading
 * fields: contains an array of strings witht the fields to be returned of the entity
 */

module.exports.query = function(req, res, next, entityModel) {
	var q = {};
	if (req.query.q) { // Query is optional
		try {
			q = JSON.parse(req.query.q);
		} catch (e) {
			res.send(400, "Not a valid JSON Query format");
		}
	}

	if (q.criteria && q.criteria._id) {
		// Transform the String representation to ObjectId
		q.criteria._id = mongoose.Types.ObjectId(q.criteria._id);
	}

	entityModel.find(q.criteria,
	q.fields, {
		"limit" : q.limit && q.limit < 101 || 20, // DEFAULT: 20 - MAX: 100 - sets the limit of documents returned in the query.
		"skip"	: q.skip || 0 // set to skip N documents ahead in your query (useful for pagination).
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