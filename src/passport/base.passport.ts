import ehr from 'express-handle-rejection'
import { Context } from '../context'
import { AuthUser } from '../services/auth-user.service'
import { Provider, UserState } from '../types'
import { CLIENT_BASE_URL } from '../config'

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
    return authUser
  }

  return null
}

export function oauthCallback(error: Error, user: any) {
  return ehr(async (req, res) => {
    const { userInfoService } = req.context
    const userInfo = await userInfoService.getUserInfoByAuthUserID(user.id)

    if (userInfo.state === UserState.PENDING) {
      return res.redirect(`${CLIENT_BASE_URL}/sign-up`)
    }

    return res.redirect(CLIENT_BASE_URL)
  })
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
      state: UserState.PENDING,
      reputation: 0,
      email,
    })

    return callback(null, authUser)
  } catch (error) {
    return callback(error, null)
  }
}
