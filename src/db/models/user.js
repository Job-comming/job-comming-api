module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        // id: {
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: DataTypes.INTEGER
        // },
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        reputation: {
            type: DataTypes.INTEGER,
            allowNULL: false,
            defaultValue: 0
        },
        deposit: {
            type: DataTypes.INTEGER,
            allowNULL: false,
            defaultValue: 0
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
    Users.associate = (models) => {
        models.Users.hasMany(models.Posts, {
            foreignKey: 'writerId',
            onDelete: 'cascade'
        });
        models.Users.hasMany(models.Mentorings, {
            foreignKey: 'id',
            onDelete: 'cascade'
        });
    };
    return Users
}
