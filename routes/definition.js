var router = require('express').Router();			// Express
var sequelize = require('../db.js');				// Sequelize's connection to the database
var User = sequelize.import('../models/user');		// Imports models/user.js
var Definition = sequelize.import('../models/definition'); //Definition.js in the models folder

router.post('/', function(req, res){
	var description = req.body.definition.desc;		//variables
	var logType = req.body.definition.type;
	var owner = req.user.id;

	Definition 										// methods
		.create({									// Objects must match the model
			description: description,
			logType: logType,
			owner: owner
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