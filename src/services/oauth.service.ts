import { OAuthModel } from '../models'
import { Provider } from '../types'

export class OAuthService {
  public constructor() {}

  public async getOAuth(serviceUserID: string, provider: Provider): Promise<OAuth> {
    const oauthModel = await OAuthModel.findOne({
      where: {
        serviceUserID,
        service: provider,
      },
    })

    if (!oauthModel) {
      return null
    }

    return this.buildOAuthModel(oauthModel)
  }

  public async createOAuth(input: OAuthCreateInput) {
    const model = await OAuthModel.create(input)
    return this.buildOAuthModel(model)
  }

  private buildOAuthModel(model: OAuthModel) {
    return new OAuth(model)
  }
}

export class OAuth {
  constructor(private model: OAuthModel) {}

  public get id() {
    return this.model.id
  }

  public get service() {
    return this.model.service
  }
  public get serviceUserID() {
    return this.model.service
  }

  public get userID() {
    return this.model.userID
  }

  public get createdAt() {
    return this.model.createdAt
  }

  public get updatedAt() {
    return this.model.updatedAt
  }
}

interface OAuthCreateInput {
  service: Provider
  serviceUserID: string
  userID: number
}
