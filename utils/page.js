import withRedux from 'next-redux-wrapper'
import { makeStore } from '../store'

export const connectPage = withRedux.bind(null, makeStore)

export function buildBundlePath(nextData, filename) {
  const { buildId } = nextData
  return `/_next/${buildId}${filename}`
}
