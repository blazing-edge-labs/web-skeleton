import 'isomorphic-fetch'
import cookies from 'utils/cookies'
import { redirect } from 'utils/universal'

const API_URL = process.env.API_URL

const encodeComponent = str =>
  encodeURIComponent(str)
  .replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`)

export const buildQuery = params =>
  Object.keys(params)
  .map(key => `${encodeComponent(key)}=${encodeComponent(params[key])}`)
  .join('&')

export const getApiUrl = (path, query) => {
  let queryPrefix = ''
  let queryStr = ''

  if (query) {
    queryStr = buildQuery(query)
  }

  if (queryStr && !/[&?]$/.test(path)) {
    queryPrefix = !/\?/.test(path) ? '?' : '&'
  }

  const fixedPath = (path[0] === '/') ? path.slice(1) : path

  return `${API_URL}/${fixedPath}${queryPrefix}${queryStr}`
}

const getOptions = (options, ctx) => {
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

const responseChecker = response => (data) => {
  if (response.status < 200 || response.status >= 300) {
    const error = new Error(response.statusText)
    error.status = response.status
    throw error
  }
  return data
}

const dataFromJsonGetter = response => (body) => {
  if (body.error) {
    const error = new Error(body.error)
    error.code = body.code
    error.status = body.status || response.status
    throw error
  }
  return body.data
}

const blobHandler = response =>
  response.blob()
  .then(responseChecker(response))

const jsonHandler = response =>
  response.json()
  .then(dataFromJsonGetter(response))
  .then(responseChecker(response))

const handle401 = ctx => (error) => {
  if (error && error.status === 401) {
    redirect(ctx, '/login')
    // return new Promise(() => {})
  }
  throw error
}

function fetchApi(path, options = {}) {
  const { query, raw, ctx, ...opts } = options

  return fetch(getApiUrl(path, query), getOptions(opts, ctx))
  .then(raw ? blobHandler : jsonHandler)
  .catch(handle401(ctx))
}

const getApi = (path, query, options) =>
  fetchApi(path, { query, ...options })

const fetchWithBody = method => (path, body, options) =>
  fetchApi(path, { method, body, ...options })

export default {
  fetch: fetchApi,
  get: getApi,
  post: fetchWithBody('POST'),
  put: fetchWithBody('PUT'),
  delete: fetchWithBody('DELETE'),
}
