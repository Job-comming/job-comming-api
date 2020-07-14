module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mentoring', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        category: {
            type: Sequelize.STRING,
            allowNULL: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNULL: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }, {
        timestamps: false,
    })
}