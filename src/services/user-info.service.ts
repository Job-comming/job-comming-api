import { UserInfoModel } from '../models'
import { MentoringService } from './mentoring.service'
import { UserState, UserLevel } from '../types'

export interface UserInfoServiceDependencies {
  mentoringService: MentoringService
}

export class UserInfoService {
  constructor(private dependencies: UserInfoServiceDependencies) {}

  public async getUserInfo(id: number) {
    if (!id) {
      return null
    }

    const model = await UserInfoModel.findByPk(id)

    if (!model) {
      return null
    }

    return this.buildUserInfo(model)
  }

  public async getUserInfoByAuthUserID(authUserID: number) {
    if (!authUserID) {
      return null
    }

    const model = await UserInfoModel.findOne({
      where: {
        authUserID,
      },
    })

    return this.buildUserInfo(model)
  }

  public async createUserInfo(input: UserInfoCreateInput) {
    const model = await UserInfoModel.create(input)
    return this.buildUserInfo(model)
  }

  public async updateUserInfo(id: number, input: UserInfoUpdateInput) {
    const model = await UserInfoModel.findByPk(id)

    Object.assign(model, input)
    await model.save()

    return this.buildUserInfo(model)
  }

  public buildUserInfo(model: UserInfoModel) {
    return new UserInfo(model, this.dependencies)
  }
}

export class UserInfo {
  constructor(
    private model: UserInfoModel,
    private dependencies: UserInfoServiceDependencies,
  ) {}

  get id() {
    return this.model.id
  }

  get authUserID() {
    return this.model.authUserID
  }

  get username() {
    return this.model.username
  }

  get email() {
    return this.model.email
  }

  get state() {
    return this.model.state
  }

  get interest() {
    return this.model.interest
  }

  get level() {
    return this.model.level
  }

  get reputation() {
    return this.model.reputation
  }

  get deposit() {
    return this.model.deposit
  }

  get menteeCount() {
    return this.model.menteeCount
  }

  get mentoCount() {
    return this.model.mentoCount
  }

  get githubURL() {
    return this.model.githubURL
  }

  get createdAt() {
    return this.model.createdAt
  }

  get updatedAt() {
    return this.model.updatedAt
  }

  // 내가 멘토인 방
  public async getMentorRoom() {
    const { mentoringService } = this.dependencies
    const mentorings = await mentoringService.getMentoringByMentorID(this.id)
    return mentorings
  }

  // 내가 멘티인 방
  public async getMenteeRoom() {
    const { mentoringService } = this.dependencies
    const mentorings = await mentoringService.getMentoringByMenteeID(this.id)
    return mentorings
  }
}

export interface UserInfoCreateInput {
  authUserID: number
  username: string
  state: UserState
  reputation: number
  email?: string
  interest?: string
  level?: UserLevel
  deposit?: number
  githubURL?: string
}

export interface UserInfoUpdateInput {
  reputation?: number
  interest?: string
  level?: UserLevel
  deposit?: number
  githubURL?: string
}
