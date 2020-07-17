import { env } from 'env-var-fp'
import { defaultTo } from 'lodash/fp'

export const PORT = process.env.PORT || 4000
export const API_BASE_URL = env(defaultTo(`http://localhost:${PORT}`))(
  'JOB_COMMING_API_BASE_URL',
)
export const CLIENT_BASE_URL = env(defaultTo(`http://localhost:3000`))(
  'JOB_COMMING_CLIENT_BASE_URL',
)
export const COOKIE_SECRET = env()('JOB_COMMING_COOKIE_SECRET')
export const DOMAIN = env(defaultTo(''))('JOB_COMMING_DOMAIN')

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

export const GOOGLE_CLIENT_ID = env()('GOOGLE_CLIENT_ID')
export const GOOGLE_CLIENT_SECRET = env()('GOOGLE_CLIENT_SECRET')
