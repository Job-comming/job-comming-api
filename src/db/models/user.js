module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userid: {
            type: DataTypes.CHAR(60),
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        hash: {
            type: DataTypes.CHAR(60),
            allowNULL: false,
        },
        salt: {
            type: DataTypes.CHAR(30),
            allowNULL: false,
        },
        reputation: {
            type: DataTypes.INTEGER,
            allowNULL: false,
            defaultValue: 0
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        timestamps: false,
    })
}