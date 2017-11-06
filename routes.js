const Router = require('./utils/next-router')

module.exports = require('next-routes')({ Router })
.add('home', '/', 'home')
.add('recoverPassword', '/recoverPassword/:code', 'recoverPassword')
