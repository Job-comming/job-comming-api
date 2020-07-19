import { UserInfoModel } from './models'

export async function getUserInfoFromSession(session: Express.Session) {
  const userID = session?.passport?.user
  if (!userID) {
    return null
  }

  return await UserInfoModel.findByPk(userID)
}
