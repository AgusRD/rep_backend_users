"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const up = (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        organization: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
};
exports.up = up;
const down = (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
};
exports.down = down;
//# sourceMappingURL=20200817181233-create-users.migration.js.map