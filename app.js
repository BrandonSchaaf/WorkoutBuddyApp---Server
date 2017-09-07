require('dotenv').config();
var express = require('express');						
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');				// Body-parser is an express method
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

// User.sync(); // User.sync({force:true}) WARNING: This will drop the table! (By forcing the table to sync)
sequelize.sync(); 


app.use(bodyParser.json()); 							// This JSONifies the data so other functions can access it
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

http.listen(3000, function(){  							// .listen is an Express method
	console.log("app is open on 3000");
})

// Creates the table in postgres
// Matches the defined model
// Doesn't drop the db

app.post('/api/user', function(req, res) {
		// When we post to API user, it will want a user object in the body 
	var username = req.body.user.username;
	var pass = req.body.user.password; //TO DO: Hash this password

		// Match the model we create above
		// Sequelize - take the user model and go out to the db and create this:
	User.create({
		username: username,
		passwordhash: ""
	}).then(
			// Sequelize is going to return the object it created from db.
		function createSuccess(user){
				// If successful, get this:
			res.json({
				user: user,
				message: 'create'
			})
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});