import { Op } from 'sequelize'
import { MentoringModel } from '../models'

export interface MentoringServiceDependencies {}

export class MentoringService {
  constructor(private dependencies: MentoringServiceDependencies) {}

  public async getMentoringByMentorID(mentorID: number) {
    const models = await MentoringModel.findAll({
      where: {
        mentorID,
      },
    })

    const entities = models.map((model) => this.buildMentoring(model))
    return entities
  }

  public async getMentoringByMenteeID(menteeID: number) {
    const models = await MentoringModel.findAll({
      where: {
        menteeID,
      },
    })

    const entities = models.map((model) => this.buildMentoring(model))
    return entities
  }

  public async getMentoringByUserID(userID: number) {
    const models = await MentoringModel.findAll({
      where: {
        [Op.or]: {
          mentorID: userID,
          menteeID: userID,
        },
      },
    })

    const entities = models.map((model) => this.buildMentoring(model))
    return entities
  }

  public buildMentoring(model: MentoringModel) {
    return new Mentoring(model)
  }
}

export class Mentoring {
  constructor(private model: MentoringModel) {}

  get id() {
    return this.model.id
  }

  get category() {
    return this.model.category
  }

  get mentorID() {
    return this.model.mentorID
  }

  get menteeID() {
    return this.model.menteeID
  }

  get description() {
    return this.model.description
  }

  get createdAt() {
    return this.model.createdAt
  }

  get updatedAt() {
    return this.model.updatedAt
  }
}
