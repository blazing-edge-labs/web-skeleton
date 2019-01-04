'use strict'

// Detect if run by NPM and fail
if (process.env.npm_lifecycle_script) {
  console.log('---- This project uses yarn! Run "yarn install" instead. ----\n')
  process.exit(1)
}
