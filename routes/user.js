var router = require('express').Router();			// Express
var sequelize = require('../db.js');				// Sequelize's connection to the database
var User = sequelize.import('../models/user');		// Imports models/user.js
var bcrypt = require('bcryptjs');					// Bcrypt
var jwt = require('jsonwebtoken');					// JWT (Json Web Token)

router.post('/', function(req, res) {				//Breaks the function into two sections: Request and Response
														// Request Section
	var username = req.body.user.username;
	var pass = req.body.user.password;
	var name = req.body.user.name;
	console.log(name)
	User.create({
		username: username,
		passwordhash: bcrypt.hashSync(pass, 10),		// Jumble (Salt) the password ten times
		name: name
	}).then(											// Response Section
		function createSuccess(user){
			var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}); //Assigns the user a JWT token. Look up process.env (the .env file says JWT_SECRET = i_am_secret)
			res.json({								// If successful
				user: user,
				message: 'create',
				sessionToken: token
			})
		},
		function createError(err){					// If unsuccessful
			res.send(500, err.message);
		}
	);
});

module.exports = router;