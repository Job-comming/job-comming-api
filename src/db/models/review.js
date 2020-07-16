module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define('Reviews', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        mentoringId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        senderId: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        receiverId: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNULL: false,
        },
        starRate: {
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
    Reviews.associate = (models) => {
        Reviews.belongsTo(models.Mentorings, {
            foreignKey: 'mentoringId',
            targetKey: 'id',
            onDelete: 'cascade',
        });
    };
    return Reviews
}
