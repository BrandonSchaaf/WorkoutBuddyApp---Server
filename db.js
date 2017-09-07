var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL ||           //Point to the deployed DATABASE_URL or the local one
	'postgres://postgres:yourpostgrespasswordhere@localhost:5432/workoutlog', {

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