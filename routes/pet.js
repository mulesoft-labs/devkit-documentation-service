// Pet routes
require("colors");
var mongoose = require("mongoose");
var routesCrud = require("./../libs/routesCrud");

module.exports = function registerPetRoutes(app) {
	console.log("Registering routes: pet".yellow);

	var entityModel = mongoose.model("pet");

	app.get("/s2/pet", function queryEmployee(req, res, next) {
		routesCrud.query(req, res, next, entityModel);
	});

	// Create
	app.post("/s2/pet", function createEmployee(req, res, next) {
		routesCrud.create(req, res, next, entityModel);
	});

	// Update
	app.put("/s2/pet/:id", function updateEmployee(req, res, next) {
		routesCrud.update(req, res, next, entityModel);
	});

	// Retrieve
	app.get("/s2/pet/:id", function retrieveEmployee(req, res, next) {
		routesCrud.retrieve(req, res, next, entityModel);
	});

	// Delete
	app.delete("/s2/pet/:id", function deleteEmployee(req, res, next) {
		routesCrud.delete(req, res, next, entityModel);
	});
}