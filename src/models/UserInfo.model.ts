import { Sequelize, Model, DataTypes } from 'sequelize'

export class UserInfoModel extends Model {
  public id: number
  public authUserID: number
  public username: string
  public email: string
  public reputation: number
  public createdAt: Date
  public updatedAt: Date
}

export function init(sequelize: Sequelize) {
  UserInfoModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      authUserID: {
        type: DataTypes.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'auth_user',
          key: 'id',
        },
        allowNull: false,
        field: 'auth_user_id',
      },
      username: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(254),
      },
      reputation: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      tableName: 'user_info',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
}

export function associate() {}
