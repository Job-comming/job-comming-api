import { Context } from '../context'
import { AuthUser } from '../services/auth-user.service'
import { Provider, UserState } from '../types'

export interface NormalizedProfile {
  serviceUserID: string
  username: string
  email: string
}

async function verify(
  context: Context,
  provider: Provider,
  profile: NormalizedProfile,
): Promise<AuthUser | null> {
  const { authUserService } = context

  const authUser = await authUserService.getAuthUserByAuthUserIDAndService(
    profile.serviceUserID,
    provider,
  )

  if (authUser) {
    // const user = await userService.getUser(oauthUser.userID)
    return authUser
  }

  return null
}

export async function verifyCallback(
  context: Context,
  accessToken: string,
  refreshToken: string,
  profile: NormalizedProfile,
  callback: (error: any, user: AuthUser | null) => any,
  provider: Provider,
) {
  try {
    let authUser = await verify(context, provider, profile)

    if (authUser) {
      return callback(null, authUser)
    }

    const { authUserService, userInfoService } = context
    const { serviceUserID, username, email } = profile

    authUser = await authUserService.createAuthUser({
      authUserID: serviceUserID,
      service: provider,
    })

    await userInfoService.createUserInfo({
      authUserID: authUser.id,
      username,
      email,
      state: UserState.PENDING,
      reputation: 0,
    })

    return callback(null, authUser)
  } catch (error) {
    return callback(error, null)
  }
}
