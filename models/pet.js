// Pet model
var mongoose = require("mongoose");

module.exports = function registerPetModel() {
	console.log("Registering mongoose model: pet".yellow);

	mongoose.model("pet", new mongoose.Schema({
		"nickname" : { "type": "String", "required": true },
		"race"	   : { "type": "String" },
		"adpotedOn": { "type": "Date", "default": Date.now }
	}));
}