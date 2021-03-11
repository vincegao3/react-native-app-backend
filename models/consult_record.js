"use strict";
const uuidv4 = require("uuid").v4;
const {Model, UUID} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class consult_record extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            consult_record.belongsTo(models.User, {foreignKey: "user_id"});
        }
    }
    consult_record.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: () => {
                    return uuidv4();
                },
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            doctor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            patient: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            diagnosis: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            medication: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fee: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE(3),
                allowNull: false,
            },
            followup: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            createdAt: {
                field: 'created_at',
                allowNull: false,
                type: DataTypes.DATE(3),
            },
            updatedAt: {
                field: 'updated_at',
                allowNull: false,
                type: DataTypes.DATE(3),
            },
            deleted_at: {
                type: DataTypes.DATE(3),
            },
        },
        {
            sequelize,
            modelName: "consult_record",
        }
    );
    return consult_record;
};
