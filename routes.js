module.exports = require('next-routes')()
.add('home', '/', 'home')
.add('recoverPassword', '/recoverPassword/:code', 'recoverPassword')
