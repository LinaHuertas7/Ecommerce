'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('departments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			code: {
				type: Sequelize.INTEGER,
			},
			active: {
				type: Sequelize.BOOLEAN,
			},
			slug: {
				type: Sequelize.STRING,
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE,
			deleted_at: Sequelize.DATE,
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('departments')
	},
}
