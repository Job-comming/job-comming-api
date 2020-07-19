import { DataTypes } from 'sequelize'
import { transact } from '../db.utils'

export default {
  up: transact(async (queryInterface, transaction) => {
    await queryInterface.createTable(
      'auth_user',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        serviceUserID: {
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
      { transaction },
    )

    await queryInterface.createTable(
      'user_info',
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
        state: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        interest: {
          type: DataTypes.TEXT,
        },
        level: {
          type: DataTypes.STRING(20),
        },
        reputation: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        deposit: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        menteeCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        mentoCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        githubURL: {
          type: DataTypes.TEXT,
          defaultValue: '',
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

    await queryInterface.createTable(
      'feed',
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
            model: 'user_info',
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
        deletedAt: {
          type: DataTypes.DATE,
          field: 'deleted_At',
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
            model: 'user_info',
            key: 'id',
          },
          allowNull: false,
          field: 'mentor_id',
        },
        menteeID: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user_info',
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
      { transaction },
    )
  }),

  down: transact(async (queryInterface, transaction) => {
    await queryInterface.dropTable('auth_user', { transaction })
    await queryInterface.dropTable('user_info', { transaction })
    await queryInterface.dropTable('post', { transaction })
    await queryInterface.dropTable('mentoring', { transaction })
  }),
}
