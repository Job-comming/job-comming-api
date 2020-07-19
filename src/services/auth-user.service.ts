import { AuthUserModel } from '../models'
import { Provider } from '../types'

export interface AuthUserServiceDependencies {}

export class AuthUserService {
  constructor(private dependencies: AuthUserServiceDependencies) {}

  public async getAuthUser(id: number) {
    if (!id) {
      return null
    }

    const model = await AuthUserModel.findByPk(id)

    if (!model) {
      return null
    }

    return this.buildAuthUser(model)
  }

  public async getAuthUserByAuthUserIDAndService(
    authUserID: string,
    service: Provider,
  ) {
    const model = await AuthUserModel.findOne({
      where: {
        authUserID,
        service,
      },
    })

    if (!model) {
      return null
    }

    return this.buildAuthUser(model)
  }

  public async createAuthUser(input: AuthUserCreateInput) {
    const model = await AuthUserModel.create(input)
    return this.buildAuthUser(model)
  }

  public buildAuthUser(model: AuthUserModel) {
    return new AuthUser(model, this.dependencies)
  }
}

export class AuthUser {
  constructor(
    private model: AuthUserModel,
    private dependencies: AuthUserServiceDependencies,
  ) {}

  get id() {
    return this.model.id
  }

  get authUserID() {
    return this.model.authUserID
  }

  get service() {
    return this.model.service
  }

  get createdAt() {
    return this.model.createdAt
  }

  get updatedAt() {
    return this.model.updatedAt
  }
}

export interface AuthUserCreateInput {
  authUserID: string
  service: Provider
}
