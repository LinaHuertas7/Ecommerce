'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Department extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Department.init(
		{
			name: DataTypes.STRING,
			code: DataTypes.INTEGER,
			active: DataTypes.BOOLEAN,
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Department',
			paranoid: true,
			deletedAt: 'deleted_at',
		}
	)

	Department.beforeBulkCreate(async (departments, options) => {
		for (const department of departments) {
			department.active = true
			const random = Math.random().toString(36)
			department.slug = random.substring(2, 12).toLocaleUpperCase()
		}
	})

	return Department
}
