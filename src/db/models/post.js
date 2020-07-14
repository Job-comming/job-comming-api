module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        writer_id: {
            type: DataTypes.CHAR(60),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING
        },
        option: {
            type: DataTypes.TINYINT,
            allowNULL: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNULL: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNULL: false,
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
    Posts.associate = (models) => {
        Posts.belongsTo(models.Users, {
            foreignKey: 'writer_id',
            targetKey: 'userid',
            onDelete: 'cascade',
        })
    };
    return Posts
}