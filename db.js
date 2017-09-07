var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', '100%Cool!', {		// Initialize connection between sequelize and database
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then( 										// Authenticate connection
	function() {
		console.log('connected to workoutlog postgres db');			// Connection is successful
	},
	function(err){
		console.log(err);											// Connection is unsuccessful
	}
);

var User = sequelize.import('./models/user');				// Import user file

module.exports = sequelize;									// Allows the code of this connection to be exported. 
															// Other files "require" this file: db.js
															// This is a node method