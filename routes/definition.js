var router = require('express').Router();			// Express
var sequelize = require('../db.js');				// Sequelize's connection to the database
var User = sequelize.import('../models/user');		// Imports models/user.js
var Definition = sequelize.import('../models/definition'); //Definition.js in the models folder

router.post('/', function(req, res){
	console.log(req.body)
	var description = req.body.desc;
	var owner = req.user.id;


	Definition 										// methods
		.create({									// Objects must match the model
			description: description,
			owner: owner		// THEN UPDATE THIS with that ajax post
		})
		.then(
			function createSuccess(definition) {	// Success function
				res.json({							// send a response as json
					definition: definition
				});
			},
			function createError(err) {				// Error function
				res.send(500, err.message);
			}

		);
});

router.get('/', function(req, res) {
	var userid = req.user.id;						// User variable

	Definition
		.findAll({
			where: {owner: userid}						// findAll by owner method
		})
		.then(
			function findAllSuccess(data){				// Success function
				res.json(data);
			},
			function findAllError(err){					// Error function
				res.send(500, err.message);
			}

		)
})

module.exports = router;