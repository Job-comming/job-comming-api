module.exports = (sequelize, DataTypes) => {
    const UserCategories = sequelize.define('UserCategories', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNULL: false,
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
    UserCategories.associate = (models) => {
        UserCategories.belongsTo(models.Users, {
            foreignKey: 'userId',
            targetKey: 'userId',
            onDelete: 'cascade',
        });
        UserCategories.hasOne(models.Users, {
            foreignKey: userId
        });
    };
    return UserCategories
}
