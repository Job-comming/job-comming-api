import { Sequelize, Model, DataTypes } from 'sequelize'

export class UserModel extends Model {
  public id: number
  public userID: string
  public username: string
  public hash: string
  public salt: string
  public reputation: number
  public createdAt: Date
}

export function init(sequelize: Sequelize) {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: DataTypes.CHAR(60),
        allowNull: false,
        unique: true,
        field: 'user_id',
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hash: {
        type: DataTypes.CHAR(60),
        allowNull: false,
      },
      salt: {
        type: DataTypes.CHAR(30),
        allowNull: false,
      },
      reputation: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
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
