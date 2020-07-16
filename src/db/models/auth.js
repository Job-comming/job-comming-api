module.exports = (sequelize, DataTypes) => {
    const Auths = sequelize.define('Auths', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    }, {
        timestamps: false,
    });
    Auths.associate = (models) => {
        Auths.hasOne(models.Users, {
            foreignKey: 'googleId',
            targetKey: 'userId',
            onDelete: 'cascade',
        })
    };
    return Auths
}
