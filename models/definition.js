module.exports = function(sequelize, DataTypes){	//With define, the first argument is going to represent a column in the database table
	return sequelize.define('definition', {
		description: DataTypes.ARRAY(DataTypes.STRING),
		owner: DataTypes.INTEGER
	},{
	});
};