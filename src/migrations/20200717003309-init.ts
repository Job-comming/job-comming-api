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
          type: DataTypes.INTEGER,
          onDelete: 'cascade',
          references: {
            model: 'user',
            key: 'id',
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

    await queryInterface.createTable(
      'oauth',
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
          field: 'id',
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
      { transaction },
    )
  }),

  down: transact(async (queryInterface, transaction) => {
    await queryInterface.dropTable('user', { transaction })
    await queryInterface.dropTable('post', { transaction })
    await queryInterface.dropTable('mentoring', { transaction })
    await queryInterface.dropTable('oauth', { transaction })
  }),
}
