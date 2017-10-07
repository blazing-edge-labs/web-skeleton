import React from 'react'
import renderer from 'react-test-renderer'
import Button from './'

describe('Button component snapshot', () => {
  it('renders basic required data', () => {
    const tree = renderer.create(<Button>Login</Button>)

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('renders empty button', () => {
    const tree = renderer.create(<Button empty>Login</Button>)

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
