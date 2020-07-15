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
        }
    }, {
        timestamps: false,
    });
    Auths.associate = (models) => {
        Auths.belongsTo(models.Users, {
            foreignKey: 'googleId',
            targetKey: 'userid',
            onDelete: 'cascade',
        })
    };
    return Auths
}
