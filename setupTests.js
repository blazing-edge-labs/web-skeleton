require('./env');

const { FormData, File, FileList } = require('file-api');

global.FormData = FormData;
global.File = File;
global.FileList = FileList;
