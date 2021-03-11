"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("consult_records", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            doctor: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            patient: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            diagnosis: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            medication: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fee: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            date: {
                type: Sequelize.DATE(3),
                allowNull: false,
            },
            followup: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            createdAt: {
                field: 'created_at',
                allowNull: false,
                type: Sequelize.DATE(3),
            },
            updatedAt: {
                field: 'updated_at',
                allowNull: false,
                type: Sequelize.DATE(3),
            },
            deleted_at: {
                type: Sequelize.DATE(3),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("consult_records");
    },
};
