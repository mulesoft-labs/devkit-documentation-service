// employee routes
require("colors");
var routesCrud = require("./../libs/routesCrud");

module.exports = function registerEmployeeRoutes(app) {
	console.log("Registering routes: query".yellow);

	// Create
	app.get("/s1/query", function createEmployee(req, res, next) {
		routesCrud.query(req, res, next);
	});
}