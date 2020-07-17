import { Sequelize, Model, DataTypes } from 'sequelize'

export class MentoringModel extends Model {
  public id: number
  public category: string
  public mentorID: number
  public menteeID: number
  public description: string
  public createdAt: Date
  public updatedAt: Date
}

export function init(sequelize: Sequelize) {
  MentoringModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mentorID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
        allowNull: false,
        field: 'mentor_id',
      },
      menteeID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
        allowNull: false,
        field: 'mentee_id',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      tableName: 'mentoring',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  )
}

export function associate() {}
