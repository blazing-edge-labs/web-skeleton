import { FileList, FormData, File } from 'file-api'
import createFormData from 'utils/createFormData'

describe('createFormData util', () => {
  it('returns FormData object with File', () => {
    const iterable = {
      image: new FileList(new File({ path: './be-temp-logo.png', type: 'image/png' })),
      firstname: 'John',
      lastname: 'Doe',
      bio: 'This is my bio',
    }
    const formData = createFormData(iterable)

    expect(typeof formData).toEqual('object')
    expect(formData instanceof FormData).toBeTruthy()
  })
})
