// Employee model
var mongoose = require("mongoose");

module.exports = function registerEmployeeModel() {
	console.log("Registering mongoose model: employee".yellow);

	mongoose.model("employee", new mongoose.Schema({
		"firstname": 	{ "type": "String", "required": true },	
		"lastname" : 	{ "type": "String", "required": true },
		"email": 		{ "type": "String", "unique": true, "required": true },
		"company": 		{ "type": "String" },
		"job": 			{ "type": "String" },
		"createdOn": 	{ "type": "Date", "default": Date.now }
	}));
}