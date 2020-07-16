import { DataTypes } from 'sequelize'
import { transact } from '../db.utils'

export default {
  up: transact(async (queryInterface, transaction) => {
    await queryInterface.createTable(
      'user',
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
      { transaction },
    )

    await queryInterface.createTable(
      'post',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        writerID: {
          type: DataTypes.CHAR(60),
          onDelete: 'cascade',
          references: {
            model: 'users',
            key: 'user_id',
          },
          allowNull: false,
          field: 'writer_id',
        },
        title: {
          type: DataTypes.STRING,
        },
        option: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      { transaction },
    )

    await queryInterface.createTable(
      'mentoring',
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
          type: DataTypes.CHAR(60),
          references: {
            model: 'user',
            key: 'user_id',
          },
          allowNull: false,
          field: 'mentor_id',
        },
        menteeID: {
          type: DataTypes.CHAR(60),
          references: {
            model: 'user',
            key: 'user_id',
          },
          allowNull: false,
          field: 'mentee_id',
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      { transaction },
    )
  }),

  down: transact(async (queryInterface, transaction) => {
    await queryInterface.dropTable('user', { transaction })
    await queryInterface.dropTable('post', { transaction })
    await queryInterface.dropTable('mentoring', { transaction })
  }),
}
