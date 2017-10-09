import * as redux from 'redux'
import { configureStore } from 'store'

describe('store', () => {
  beforeEach(() => {
    global.window = {
      devToolsExtension: jest.fn(() => (f => f)),
    }
    spyOn(redux, 'compose').and.callThrough()
  })
  afterEach(() => {
    delete global.window
  })

  it('should test development environment configuration with devTools', () => {
    configureStore('development')
    expect(window.devToolsExtension).toHaveBeenCalled()
  })

  it('should test development environment configuration without devTools',
    () => {
      global.window = {}
      configureStore('development')
      expect(window.devToolsExtension).toBeUndefined()
    }
  )

  it('should test other environments configuration', () => {
    configureStore('production')
    expect(window.devToolsExtension).not.toHaveBeenCalled()
  })
})
