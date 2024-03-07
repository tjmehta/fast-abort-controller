const { defaults } = require('jest-config')

/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs', 'cjs'],
}

module.exports = config
