const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
	{
		id: {
            type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
        description: {
            type: DataTypes.TEXT,
			allowNull: false
        },
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		sequelize,
        timeStamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'post',
	}
);

module.exports = Posts;