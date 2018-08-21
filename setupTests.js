import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

require('@babel/polyfill')
require('dotenv-safe').load()

Enzyme.configure({ adapter: new Adapter() })

const { FormData, File, FileList } = require('file-api')

global.FormData = FormData
global.File = File
global.FileList = FileList
