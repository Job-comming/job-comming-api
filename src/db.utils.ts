import { QueryInterface, Transaction } from 'sequelize'

export function transact(
  handler: (
    queryInterface: QueryInterface,
    transaction: Transaction,
  ) => Promise<void>,
) {
  return async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await handler(queryInterface, transaction)
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
