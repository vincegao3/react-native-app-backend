"use strict";
const uuidv4 = require("uuid").v4;
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.consult_record, {foreignKey: "user_id"});
        }
    }
    User.init(
        {
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: () => {
                    return uuidv4();
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                field: "created_at",
                allowNull: false,
                type: DataTypes.DATE(3),
            },
            updatedAt: {
                field: "updated_at",
                allowNull: false,
                type: DataTypes.DATE(3),
            },
            deleted_at: {
                type: DataTypes.DATE(3),
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
