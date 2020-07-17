import { UserModel } from './models'

export async function getUserFromSession(session: Express.Session) {
  if (!session?.userID) {
    return null
  }

  return await UserModel.findByPk(session.userID)
}
