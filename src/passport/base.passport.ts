import { Context } from '../context'
import { User } from '../services/user.service'
import { Provider } from '../types'

export interface NormalizedProfile {
  serviceUserID: string
  username: string
  email: string
}

async function verify(
  context: Context,
  provider: Provider,
  profile: NormalizedProfile,
): Promise<User | null> {
  const { userService, oauthService } = context

  const oauthUser = await oauthService.getOAuth(profile.serviceUserID, provider)

  if (oauthUser) {
    const user = await userService.getUserByAuthUserID(oauthUser.userID)
    return user
  }

  return null
}

export async function verifyCallback(
  context: Context,
  accessToken: string,
  refreshToken: string,
  profile: NormalizedProfile,
  callback: (error: any, user: User | null) => any,
  provider: Provider,
) {
  try {
    let user = await verify(context, provider, profile)

    if (user) {
      return callback(null, user)
    }

    const { userService, oauthService } = context
    const { serviceUserID, username, email } = profile

    user = await userService.createUser({
      username,
      email,
      reputation: 0,
    })

    await oauthService.createOAuth({
      service: provider,
      serviceUserID,
      userID: user.id,
    })

    return callback(null, user)
  } catch (error) {
    return callback(error, null)
  }
}
