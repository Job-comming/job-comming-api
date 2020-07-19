import { Sequelize, Model, DataTypes, BelongsTo } from 'sequelize'
import { UserInfoModel } from './UserInfo.model'

export class FeedModel extends Model {
  public id: number
  public writerID: number
  public content: string
  public type: number
  public tag: string
  public createdAt: Date
  public updatedAt: Date

  static UserInfoModel: BelongsTo<FeedModel, UserInfoModel>
}

export function init(sequelize: Sequelize) {
  FeedModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      writerID: {
        type: DataTypes.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        field: 'writer_id',
      },
      content: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tag: {
        type: DataTypes.TEXT,
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
      tableName: 'feed',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
}

export function associate() {
  FeedModel.UserInfoModel = FeedModel.belongsTo(UserInfoModel, {
    foreignKey: 'writerID',
  })
}
