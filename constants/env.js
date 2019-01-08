import getConfig from 'next/config'

let env
const nextConfig = getConfig()

if (nextConfig) {
  env = {
    ...nextConfig.publicRuntimeConfig,
    ...nextConfig.serverRuntimeConfig,
  }
}

// fallback to process.env for tests with jest
export default (env || process.env)
