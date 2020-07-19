import { Sequelize, Op } from 'sequelize'
import {
  FeedModel,
  getTableName as t,
  getTableNameDotColumnName as c,
} from '../models'
import { UserInfo, UserInfoService } from './user-info.service'
import { CursorPagination, FeedType } from '../types'

export interface FeedServiceDependencies {
  currentUser: UserInfo
  sequelize: Sequelize
  userInfoService: UserInfoService
}

export class FeedService {
  constructor(private dependencies: FeedServiceDependencies) {}

  public async getFeed(id: number) {
    if (!id) {
      return null
    }

    const model = await FeedModel.findByPk(id)

    if (!model) {
      return null
    }

    return this.buildFeed(model)
  }

  public async getFeeds(pagination: CursorPagination, filterBy?: FeedFilters) {
    if (!pagination) {
      pagination = { currentCursor: 0, pageSize: 10 }
    }

    const { currentCursor, pageSize } = pagination

    const models = await FeedModel.findAll({
      where: {
        id: {
          [Op.lt]: currentCursor,
        },
        ...(filterBy?.writerID && {
          writerID: filterBy.writerID,
        }),
      },
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      logging: console.log,
    })

    const feeds = models.map((model) => this.buildFeed(model))
    return feeds
  }

  public async createFeed(input: CreateFeedInput) {
    const { currentUser } = this.dependencies
    const { tags, ...other } = input

    const model = await FeedModel.create({
      tag: tags.join(','),
      ...other,
      writerID: currentUser.id,
    })

    return this.buildFeed(model)
  }

  public buildFeed(model: FeedModel) {
    return new Feed(model, this.dependencies)
  }
}

export class Feed {
  constructor(
    private model: FeedModel,
    private dependencies: FeedServiceDependencies,
  ) {}

  get id() {
    return this.model.id
  }

  get writerID() {
    return this.model.writerID
  }

  async getWriterName() {
    const { userInfoService } = this.dependencies
    return await userInfoService.getUserInfo(this.writerID)
  }

  get content() {
    return this.model.content
  }

  get type() {
    return this.model.type
  }

  get tag() {
    return this.model.tag
  }

  get tags() {
    return this.tag.split(',')
  }

  get createdAt() {
    return this.model.createdAt
  }

  get updatedAt() {
    return this.model.updatedAt
  }

  get deletedAt() {
    return this.model.deletedAt
  }

  async toJSON() {
    return {
      id: this.id,
      writterID: this.writerID,
      writrName: await this.getWriterName(),
      content: this.content,
      type: this.type,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}

interface FeedFilters {
  writerID: number
}

interface CreateFeedInput {
  content: string
  type: FeedType
  tags: string[]
}
