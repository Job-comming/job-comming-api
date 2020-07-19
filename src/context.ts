import { Request, Response } from 'express'
import { Sequelize } from 'sequelize'
import lazy from 'lazy-get'
import { UserInfoModel } from './models'
import {
  AuthUserService,
  AuthUserServiceDependencies,
  UserInfo,
  UserInfoService,
  UserInfoServiceDependencies,
  MentoringService,
  MentoringServiceDependencies,
} from './services'

export class Context
  implements
    AuthUserServiceDependencies,
    UserInfoServiceDependencies,
    MentoringServiceDependencies {
  @lazy get authUserService(): AuthUserService {
    return new AuthUserService(this)
  }

  @lazy get userInfoService(): UserInfoService {
    return new UserInfoService(this)
  }

  @lazy get mentoringService(): MentoringService {
    return new MentoringService(this)
  }

  public currentUser: UserInfo

  constructor(
    public sequelize: Sequelize,
    public req: Request,
    private res: Response,
    public userInfoModel: UserInfoModel,
  ) {
    if (userInfoModel) {
      this.currentUser = this.userInfoService.buildUserInfo(userInfoModel)
    }
  }
}
