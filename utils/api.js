import 'isomorphic-fetch'
import cookies from 'utils/cookies'
import { redirect } from 'utils/universal'
import env from 'constants/env'

const encodeComponent = str =>
  encodeURIComponent(str)
    .replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`)

const buildQuery = params =>
  Object.keys(params)
    .map(key => `${encodeComponent(key)}=${encodeComponent(params[key])}`)
    .join('&')

export function resolveURL(path, query) {
  let url = env.API_URL

  if (path) {
    if (path[0] !== '/') {
      url += '/'
    }
    url += path
  }

  if (query) {
    const queryStr = buildQuery(query)

    if (queryStr) {
      if (!/[&?]$/.test(url)) {
        url += !/\?/.test(url) ? '?' : '&'
      }
      url += queryStr
    }
  }

  return url
}

function getOptions(options, ctx) {
  const token = cookies.get('token', { ctx })

  const defaultHeaders = {
    Authorization: token ? `Bearer ${token}` : '',
  }

  let { body } = options

  const isJSON = body != null
    && typeof body === 'object'
    && !(body instanceof FormData)

  if (isJSON) {
    defaultHeaders['Content-Type'] = 'application/json'
    body = JSON.stringify(body)
  }

  return {
    ...options,
    body,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }
}

async function fetchApi(path, options = {}) {
  const { query, ctx, ...opts } = options

  const response = await fetch(resolveURL(path, query), getOptions(opts, ctx))
  const body = await response.json()
  const { status } = response

  if (!status || status < 200 || status >= 300) {
    const error = new Error(body.error || response.statusText)
    error.status = status
    error.code = body.code
    error.data = body.data

    if (status === 401) {
      redirect(ctx, '/login')
      // return new Promise(() => {})
    }

    throw error
  }

  if (!('data' in body)) {
    if (typeof console !== 'undefined' && console && console.warn) { // eslint-disable-line no-console
      console.warn('It seems API is not wrapping data any more?! Check the source of this warning...') // eslint-disable-line no-console
    }
    return body
    // If warning above appears in console, you should probably:
    //   1. replace `return body.data` below with `return body`,
    //   2. remove this if-block.
  }

  return body.data
}

export default {
  fetch: fetchApi,
  get: (path, query, options) => fetchApi(path, { query, ...options, method: 'GET' }),
  post: (path, body, options) => fetchApi(path, { body, ...options, method: 'POST' }),
  put: (path, body, options) => fetchApi(path, { body, ...options, method: 'PUT' }),
  delete: (path, body, options) => fetchApi(path, { body, ...options, method: 'DELETE' }),
}
