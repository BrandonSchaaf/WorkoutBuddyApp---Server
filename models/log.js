module.exports = function(sequelize, DataTypes) {	// Build a model in sequelize
	return sequelize.define('log', {
		description: DataTypes.STRING,
		result: DataTypes.STRING,
		owner: DataTypes.INTEGER,
		def: DataTypes.STRING
	},{
	});
};