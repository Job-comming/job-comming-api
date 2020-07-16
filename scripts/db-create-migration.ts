import path from 'path'
import fs from 'fs'
import yargs from 'yargs'
import { format } from 'date-fns'

const { argv } = yargs
  .nargs('name', 1)
  .describe('name', 'Migration name')
  .demandOption(['name'])
  .alias('name', 'n')

const { name } = argv

const ROOT_PATH = path.resolve(__dirname, '..')
const MIGRATION_DIR = path.join('src', 'migrations')
console.log('ROOT_PATH', ROOT_PATH)
console.log('MIGRATION_DIR', MIGRATION_DIR)

const date = format(new Date(), 'yyyyMMddHHmmss')
const filename = `${date}-${name}`
const jsfile = path.join(MIGRATION_DIR, filename + '.js')
const tsfile = path.join(MIGRATION_DIR, filename + '.ts')
const jspath = path.resolve(ROOT_PATH, jsfile)
const tspath = path.resolve(ROOT_PATH, tsfile)

fs.writeFileSync(
  jspath,
  `
/* eslint-disable @typescript-eslint/no-var-requires */

require('ts-node/register')
const path = require('path')
module.exports = require('./' +
  path.basename(__filename).replace('.js', '.ts')).default
`.trim() + '\n',
)

fs.writeFileSync(
  tspath,
  `
import { DataTypes } from 'sequelize'
import { transact } from '../db.utils'

export default {
  up: transact(async (queryInterface, transaction) => {
  }),

  down: transact(async (queryInterface, transaction) => {
  }),
}
`.trim() + '\n',
)

console.log('created files:')
console.log(`  - ${jsfile}`)
console.log(`  - ${tsfile}`)
