// MetaData routes
var mongoose = require("mongoose");
var _ = require("underscore")._;

module.exports = function(app) {
	console.log("Registering routes: metadata".yellow);

	var s1Entities = ["employee"];
	var s2Entities = ["pet"];

	app.get("/s1/metadatatypes", function(req, res, next) {
		res.send(s1Entities);
	});

	app.get("/s1/metadata", function(req, res, next) {
		getType(s1Entities, req, res, next);
	});

	app.get("/s2/metadatatypes", function(req, res, next) {
		res.send(s2Entities);
	});

	app.get("/s2/metadata", function(req, res, next) {
		getType(s2Entities, req, res, next);
	});

	function getType(arr, req, res, next) {
		var type = req.query.type;

		if (_.indexOf(arr, type) > -1) {
			var model = mongoose.model(type);
			res.send(model.schema.paths);
		} else {
			res.send(400, "Entity " + type + " is not a valid type");
		}
	}
}