import { UserModel } from '../models'
import { MentoringService } from './mentoring.service'

export interface UserServiceDependencies {
  mentoringService: MentoringService
}

export class UserService {
  constructor(private dependencies: UserServiceDependencies) {}

  public async getUser(id: number) {
    const model = await UserModel.findByPk(id)

    if (!model) return null

    return this.buildUser(model)
  }

  public buildUser(model: UserModel) {
    return new User(model, this.dependencies)
  }
}

export class User {
  constructor(
    private model: UserModel,
    private dependencies: UserServiceDependencies,
  ) {}

  get id() {
    return this.model.id
  }

  get userID() {
    return this.model.userID
  }

  get username() {
    return this.model.username
  }

  get hash() {
    return this.model.hash
  }

  get salt() {
    return this.model.salt
  }

  get reputation() {
    return this.model.reputation
  }

  get createdAt() {
    return this.model.createdAt
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
