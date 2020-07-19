import { Sequelize, Model, DataTypes } from 'sequelize'

export class AuthUserModel extends Model {
  public id: number
  public authUserID: string
  public service: string
  public createdAt: Date
  public updatedAt: Date
}

export function init(sequelize: Sequelize) {
  AuthUserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authUserID: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'auth_user_id',
      },
      service: {
        type: DataTypes.STRING(12),
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
      tableName: 'auth_user',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
}

export function associate() {}
