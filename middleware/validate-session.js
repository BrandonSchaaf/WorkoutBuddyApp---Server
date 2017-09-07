var jwt = require('jsonwebtoken'); 	// Import jsonwebToken library (encryption method)
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function(req, res, next) {
	var sessionToken = req.headers.authorization;	// Encrypted username and passwordhash 
													// is imported from the login page
													// token is like a hand stamp at bar. Allows you to 
													// traverse the page without logging in every time.

	if(!req.body.user && sessionToken){												// If no user signed in AND session token is present
		jwt.verify(sessionToken, process.env.JWT_SECRET, function(err, decoded){	// Session token is decoded using the decryption key in the .env (hidden) file
			if(decoded){ 															// If successfully decrypted
				User.findOne({where: { id: decoded.id}}).then(						// The decrypted username and passwordhash are checked against the database, attempting to find a match
					function(user){													// If match is found, user is set (signed in) and passed to the next page
						req.user = user;
						next();
					},
					function(){
						req.status(401).send({error: 'Not authorized'});	// If no match found (incorrect username or passwordhash), error is thrown
					}
				);
			} else {
				res.status(401).send({error: 'Not authorized'});			// If decryption is unsuccessful, error is thrown
			}
		});
	} else { 			// User is signed in OR session taken not present
		next(); 		// Go to next page
	}
}