import { Sequelize, Options, Model } from 'sequelize'

export { UserModel } from './User.model'
import { init as initUserModel, associate as associateUserModel } from './User.model'

export { OAuthModel } from './OAuth.model'
import {
  init as initOAuthModel,
  associate as associateOAuthModel,
} from './OAuth.model'

export { PostModel } from './Post.model'
import { init as initPostModel, associate as associatePostModel } from './Post.model'

export { MentoringModel } from './Mentoring.model'
import {
  init as initMentoringModel,
  associate as associateMentoringModel,
} from './Mentoring.model'

export async function init(options: Options) {
  const sequelize = new Sequelize(options)

  initUserModel(sequelize)
  initPostModel(sequelize)
  initMentoringModel(sequelize)
  initOAuthModel(sequelize)

  associateUserModel()
  associatePostModel()
  associateMentoringModel()
  associateOAuthModel()

  return sequelize
}

export function getTableName(model: typeof Model) {
  return model.tableName
}

type AbstractInstanceType<T> = T extends { prototype: infer U } ? U : never

export function getColumnName<T extends typeof Model>(
  model: T,
  field: keyof AbstractInstanceType<T>,
) {
  return model.rawAttributes[field as string].field
}

export function getTableNameDotColumnName<T extends typeof Model>(
  model: T,
  field: keyof AbstractInstanceType<T>,
) {
  return `${getTableName(model)}.${getColumnName(model, field)}`
}
