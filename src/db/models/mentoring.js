module.exports = (sequelize, DataTypes) => {
    const Mentorings = sequelize.define('Mentorings', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        mentorId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        menteeId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNULL: true,
        },
        finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNULL: false
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
    Mentorings.associate = (models) => {
        Mentorings.belongsTo(models.Users, {
            foreignKey: 'mentorId',
            targetKey: 'userId',
            onDelete: 'cascade',
        });
        Mentorings.belongsTo(models.Users, {
            foreignKey: 'menteeId',
            targetKey: 'userId',
            onDelete: 'cascade',
        });
    };
    return Mentorings
}