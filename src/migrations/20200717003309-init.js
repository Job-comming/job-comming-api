/* eslint-disable @typescript-eslint/no-var-requires */

require('ts-node/register')
const path = require('path')
module.exports = require('./' +
  path.basename(__filename).replace('.js', '.ts')).default
