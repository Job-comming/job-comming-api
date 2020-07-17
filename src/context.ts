import { Request, Response } from 'express'
import { Sequelize } from 'sequelize'
import lazy from 'lazy-get'
import { UserModel } from './models'
import {
  User,
  UserService,
  UserServiceDependencies,
  OAuthService,
  MentoringService,
  MentoringServiceDependencies,
} from './services'

export class Context
  implements UserServiceDependencies, MentoringServiceDependencies {
  @lazy get userService(): UserService {
    return new UserService(this)
  }

  @lazy get oauthService(): OAuthService {
    return new OAuthService()
  }

  @lazy get mentoringService(): MentoringService {
    return new MentoringService(this)
  }

  public currentUser: User

  constructor(
    public sequelize: Sequelize,
    public req: Request,
    private res: Response,
    public userModel: UserModel,
  ) {
    if (userModel) {
      this.currentUser = this.userService.buildUser(userModel)
    }
    if (this.req.user) {
      this.currentUser = this.req.user
    }
  }
}
