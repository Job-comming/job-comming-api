import { Sequelize, Model, DataTypes } from 'sequelize'

export class UserModel extends Model {
  public id: number
  public username: string
  public email: string
  public reputation: number
  public createdAt: Date
  public updatedAt: Date
}

export function init(sequelize: Sequelize) {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      tableName: 'user',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
}

export function associate() {}
