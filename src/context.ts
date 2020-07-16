import { Sequelize } from 'sequelize'
import lazy from 'lazy-get'
import { UserService, UserServiceDependencies } from './services'
import { MentoringService, MentoringServiceDependencies } from './services'

export class Context
  implements UserServiceDependencies, MentoringServiceDependencies {
  
  @lazy get userService(): UserService {
    return new UserService(this)
  }

  @lazy get mentoringService(): MentoringService {
    return new MentoringService(this)
  }

  constructor(public sequelize: Sequelize) {}
}
