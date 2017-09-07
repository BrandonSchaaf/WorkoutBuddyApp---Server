var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');

router.post('/', function(req, res) { 													// Express method
	User.findOne( {where: {username: req.body.user.username} }).then(					// Sequelize method, find one
		function(user) {				// Found a match! SUCCESS!
			if (user) {					// Time to check the password they used								
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){		//bcrypt is able to compare req.body.user.password to user.passwordhash
					if(matches){																				// Password matches!
						var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});		// Assign "token" so we can validate the user after login
						res.json({																				// Server responds with..										
							user: user,																			// User object,
							message: "successfully authenticated",												// Success message
							sessionToken: token 																// Token created on line 13
						});
					}else{
						res.status(500).send({error: "failed to authenticate"});		// What to do if the password doesn't match
					}
				});
			} else {
				res.status(500).send({error: "failed to authenticate"});				// I don't know.
			}
		},
		function(err) {					// Couldn't found a match. FAILURE
			res.json(err);
		}
	);
});

module.exports = router;