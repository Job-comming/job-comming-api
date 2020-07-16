import { env } from 'env-var-fp'
import { defaultTo } from 'lodash/fp'

export const PORT = process.env.PORT || 4000
export const MYSQL_HOST = env(defaultTo('localhost'))('JOB_COMMING_MYSQL_HOST')
export const MYSQL_PORT = env(
  defaultTo('3306'),
  parseFloat,
)('JOB_COMMING_MYSQL_PORT')
export const MYSQL_USERNAME = env(defaultTo('root'))('JOB_COMMING_MYSQL_USERNAME')
export const MYSQL_PASSWORD = env(defaultTo('1234'))('JOB_COMMING_MYSQL_PASSWORD')
export const MYSQL_DATABASE = env(defaultTo('job_comming_test'))(
  'JOB_COMMING_DATABASE',
)
