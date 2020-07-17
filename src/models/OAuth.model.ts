import { Sequelize, Model, DataTypes } from 'sequelize'
import { Provider } from '../types'

export class OAuthModel extends Model {
  public id: number
  public service: Provider
  public serviceUserID: string
  public userID: number
  public createdAt: Date
  public updatedAt: Date
}

export function init(sequelize: Sequelize) {
  OAuthModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      service: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      serviceUserID: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'service_user_id',
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
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
      tableName: 'oauth',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
}

export function associate() {}
