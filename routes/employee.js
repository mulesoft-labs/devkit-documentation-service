// employee routes
require("colors");
var mongoose = require("mongoose");
var routesCrud = require("./../libs/routesCrud");

module.exports = function registerEmployeeRoutes(app) {
	console.log("Registering routes: employee".yellow);

	var entityModel = mongoose.model("employee");

	app.get("/s1/employee", function queryEmployee(req, res, next) {
		routesCrud.query(req, res, next, entityModel);
	});

	// Create
	app.post("/s1/employee", function createEmployee(req, res, next) {
		routesCrud.create(req, res, next, entityModel);
	});

	// Update
	app.put("/s1/employee/:id", function updateEmployee(req, res, next) {
		routesCrud.update(req, res, next, entityModel);
	});

	// Retrieve
	app.get("/s1/employee/:id", function retrieveEmployee(req, res, next) {
		routesCrud.retrieve(req, res, next, entityModel);
	});

	// Delete
	app.delete("/s1/employee/:id", function deleteEmployee(req, res, next) {
		routesCrud.delete(req, res, next, entityModel);
	});
}