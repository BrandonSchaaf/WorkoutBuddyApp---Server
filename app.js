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
http.listen(process.env.PORT || 3000, function() {  							// .listen is an Express method
	console.log("app is open on 3000");
});