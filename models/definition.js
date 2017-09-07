module.exports = function(sequelize, DataTypes){	//With define, the first argument is going to represent a column in the database table

	return sequelize.define('definition', {
		description: DataTypes.STRING,
		logType: DataTypes.STRING, 					//By time, reps, weight...
		owner: DataTypes.INTEGER
	},{
	});
};