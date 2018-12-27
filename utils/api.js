import 'isomorphic-fetch'
import cookies from 'utils/cookies'
import { redirect } from 'utils/universal'

const API_URL = process.env.API_URL

const encodeComponent = str =>
  encodeURIComponent(str)
    .replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`)

const buildQuery = params =>
  Object.keys(params)
    .map(key => `${encodeComponent(key)}=${encodeComponent(params[key])}`)
    .join('&')

export function getApiUrl(path, query) {
  let url = API_URL

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

function fetchApi(path, options = {}) {
  const { query, raw, ctx, ...opts } = options

  let response

  return fetch(getApiUrl(path, query), getOptions(opts, ctx))
    .then((r) => {
      response = r
      return raw ? r.blob() : r.json()
    })
    .then((body) => {
      if (raw) {
        return body
      }

      if (body.error) {
        const error = new Error(body.error)
        error.code = body.code
        error.status = body.status || response.status
        throw error
      }

      return body.data
    })
    .then((data) => {
      if (response.status < 200 || response.status >= 300) {
        const error = new Error(response.statusText)
        error.status = response.status
        throw error
      }
      return data
    })
    .catch((error) => {
      if (error && error.status === 401) {
        redirect(ctx, '/login')
        // return new Promise(() => {})
      }
      throw error
    })
}

export default {
  fetch: fetchApi,
  get: (path, query, options) => fetchApi(path, { query, ...options, method: 'GET' }),
  post: (path, body, options) => fetchApi(path, { body, ...options, method: 'POST' }),
  put: (path, body, options) => fetchApi(path, { body, ...options, method: 'PUT' }),
  delete: (path, body, options) => fetchApi(path, { body, ...options, method: 'DELETE' }),
}
