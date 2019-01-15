import fetchMock from 'fetch-mock'
import cookies from 'utils/cookies'
import { Router } from 'routes'
import createFormData from 'utils/createFormData'
import api from 'utils/api'

const { API_URL } = process.env

describe('fetchApi util', () => {
  afterEach(() => {
    delete fetchMock.restore()
  })

  const cookiesGet = cookies.get
  cookies.get = jest.fn(() => 'this.is.token')

  afterAll(() => {
    cookies.get = cookiesGet
  })

  it('Call with json content', () => {
    const body = {
      bio: 'This is my bio.',
      firstname: 'John',
      lastname: 'Doe',
    }

    fetchMock.mock(`${API_URL}/test`, {})

    const check = method =>
      expect(fetchMock.lastCall()).toEqual([`${API_URL}/test`, {
        method,
        body: '{"bio":"This is my bio.","firstname":"John","lastname":"Doe"}',
        headers: {
          Authorization: 'Bearer this.is.token',
          'Content-Type': 'application/json',
        },
      }])

    api.fetch('/test', { method: 'POST', body })
    check('POST')
    api.post('/test', body)
    check('POST')

    api.fetch('/test', { method: 'PUT', body })
    check('PUT')
    api.put('/test', body)
    check('PUT')

    api.fetch('/test', { method: 'DELETE', body })
    check('DELETE')
    api.delete('/test', body)
    check('DELETE')
  })

  it('Call with FormData', () => {
    const formData = createFormData({
      bio: 'This is my bio.',
      firstname: 'John',
      lastname: 'Doe',
    })

    fetchMock.mock(`${API_URL}/test`, {})

    const check = () =>
      expect(fetchMock.lastCall()).toEqual([`${API_URL}/test`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer this.is.token',
        },
      }])

    api.fetch('test', { method: 'POST', body: formData })
    check()

    api.post('test', formData)
    check()
  })

  it('api.fetch API data', () => {
    const data = { test: 123 }

    fetchMock.get('*', { data })

    const expectedUrl = `${API_URL}/self?flag=true&s=Hello%20world%21`

    const check = method =>
      expect(fetchMock.lastCall()).toEqual([expectedUrl, {
        method,
        headers: {
          Authorization: 'Bearer this.is.token',
        },
      }])

    const p1 = api.fetch('/self', { query: { flag: true, s: 'Hello world!' } })
      .then((fetchedData) => {
        expect(fetchedData).toEqual(data)
      })
    check()

    const p2 = api.get('/self?flag=true', { s: 'Hello world!' })
      .then((fetchedData) => {
        expect(fetchedData).toEqual(data)
      })
    check('GET')

    const p3 = api.get('/self', { flag: true, s: 'Hello world!' })
      .then((fetchedData) => {
        expect(fetchedData).toEqual(data)
      })
    check('GET')

    return Promise.all([p1, p2, p3])
  })

  it('api.fetch API with 401 error', () => {
    const responseBody = { error: 'foo', status: 401 }
    fetchMock.get(`${API_URL}/self`, { body: responseBody })

    Router.pushRoute = jest.fn()

    return api.fetch('/self').then(fail, (reason) => {
      expect(reason.status).toEqual(401)
      expect(Router.pushRoute).toHaveBeenCalledWith('/login')
    })
  })

  it('api.fetch with no response', () => {
    fetchMock.get(`${API_URL}/self`, { status: 404, body: {} })

    return api.fetch('/self', {}).then(fail, (reason) => {
      expect(reason.status).toEqual(404)
    })
  })
})
