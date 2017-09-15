var router = require('express').Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log');
var User = sequelize.import('../models/user');
var Definition = sequelize.import('../models/definition');

router.post('/', function(req, res) {						// Req has some body properties that have a username and password
    var description = req.body.log.description; 
    var result = req.body.log.result; 
    var user = req.user;
    var definition = req.body.log.def;

	Log 													// Use our sequelize model to create log
	    .create({ 
	    	description: description,
	    	result: result,
	    	owner: user.id,
	    	def: definition
	    })
	    .then(
	    	function createSuccess(log) {
	    		res.json(log);
	    	}, 
		    function createError(err) {
		        res.send(500, err.message);
		    }
	    );
});

router.get('/', function(req, res) {
	var userid = req.user.id;
	Log
	.findAll({
		where: { owner: userid }
	})
	.then(
		function findAllSuccess(data) {
			res.json(data);
		},
		function findAllError(err) {
			res.send(500, err.message);
		}
	);
});

router.get('/:id', function(req, res) {		// This will retrieve one workout specified by the log ID
	var data = req.params.id;
	Log
		.findOne({
			where: { id: data }
		}).then(
			function getSucces(updateData) {
				res.json(updateData);
			},

			function getError(err) {
				res.send(500, err.message);
			}
		);
});

router.put('/', function(req,res) {			// This will return the data from the log that was updated
    var description = req.body.log.description;
    var result = req.body.log.result; 
    var data = req.body.log.id;
    var definition = req.body.log.def;
    console.log(req);
    Log
    	.update(
    	{
    		description: description,
	    	result: result,
	    	def: definition
    	},

    	{where: {id: data}}
    	).then(
    		function updateSuccess(updatedLog) {
    			res.json(updatedLog);
    		},

    		function updateError(err){
    			res.send(500, err.message);
    		}
    	)
});


router.delete('/', function(req, res) {
	var data = req.body.log.id;
	Log
		.destroy({
			where: { id: data }
		}).then(
			function deleteLogSuccess(data){
				res.send("Log removed");
			},
			function deleteLogError(err){
				res.send(500, err.message);
			}
		);
});

module.exports = router;