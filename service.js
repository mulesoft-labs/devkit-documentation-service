/*******************************************************************************************************************
	Author: Gustavo A. Alberola
	Blog:   http://gustavoalberola.blogspot.com.ar/
	Git:    https://github.com/galberola

*******************************************************************************************************************/

// initialization ============================================================================================
require("colors");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 8080;

// connect to the database ===================================================================================
mongoose.connect("mongodb://localhost:27017/simplerest");
var mongoConnection = mongoose.connection;

mongoConnection.on("error", function() {
	console.log("Can not connect to MongoDB".red);
	process.exit(0);
});

mongoConnection.once("open", function() {
	console.log("Connected to MongoDB".green);
});

// configure mongoose models =================================================================================
require("./models/employee")();
require("./models/pet")();

// configure app =============================================================================================
app.configure(function () {
	app.use(express.logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded());
});

// configure routes ==========================================================================================
require("./routes/employee")(app);
require("./routes/pet")(app);
require("./routes/metadata")(app);

// launch app ================================================================================================
var server = app.listen(port, function() {
	console.log(("App listening on port " + port).green);
});

// handle system requesting shutdown =========================================================================
function handleExitApplicationServer() {
 	console.log("Shutting down application server".red);
 	
 	/*
 	 * Once the close is requested print how many connections the application service has left
 	 */
 	try {
 		var pendingConnections = server.getConnections( function (err, count) {
 			if (!err) {
 				console.log(("Pending connections : " + count).yellow);
 			}
 		});
 	} catch (e) {}

 	/* HttpServer.close() will make the HttpServer to stop listening for new connections, but will handle
 	 * all that are already in the queue or being attended
	 *
 	 * It will call the handler once all connections were handled
 	 */
 	try {
	 	server.close(function() {
	 		console.log("Application Server down".yellow);
	 		handleExitMongoDB();
	 	});
 	} catch (e) {
 		console.log("Application Server was already down".yellow);
 		// If server was alredy closed will throw an exception
 		handleExitMongoDB();
 	}
}

function handleExitMongoDB() {
	/*
	 * Once the server is down we can shutdown the database.
	 * Shutting down the database before the Application Server might produce errors because some current connection
	 * might try to access database
	 */
	console.log("Shutting down MongoDB".red);
	try {
		mongoConnection.close(function () {
			console.log("MongoDB down".yellow);
		});
	} catch (e) {
		console.log("MongoDB was already down".yellow);
	}
}

process.on('exit', function() {
 	handleExitApplicationServer();
});