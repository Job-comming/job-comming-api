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
        mentor_id: {
            type: DataTypes.CHAR(60),
            allowNull: false,
        },
        mentee_id: {
            type: DataTypes.CHAR(60),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNULL: true,
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
    });
    Mentorings.associate = (models) => {
        Mentorings.belongsTo(models.Users, {
            foreignKey: 'mentor_id',
            targetKey: 'userid',
            onDelete: 'cascade',
        });
        Mentorings.belongsTo(models.Users, {
            foreignKey: 'mentee_id',
            targetKey: 'userid',
            onDelete: 'cascade',
        });
    };
    return Mentorings
}