'use strict'

const bcrypt = require('bcrypt')

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	)

	User.beforeCreate(async (user, options) => {
		if (user.password) {
			const salt = await bcrypt.genSaltSync(10, 'a')
			user.password = bcrypt.hashSync(user.password, salt)
		}

		const random = Math.random().toString(36)

		user.slug = random.substring(2, 12).toLocaleUpperCase()
	})

	User.prototype.validPassword = async function (password) {
		return await bcrypt.compare(password, this.password)
	}

	return User
}
