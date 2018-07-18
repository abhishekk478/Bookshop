const route = require('express').Router()

route.use('/users', require('./users'))
route.use('/products', require('./products'))
route.use('/log', require('./log'))
route.use('/wish',require('./wish'))
route.use('/message',require('./message'))
route.use('/cart',require('./cart'))
route.use('/chkout',require('./chkout'))
route.use('/remove',require('./remove'))
route.use('/buyerdata',require('./buyerdata'))
route.use('/chngpwd',require('./chngpwd'))
route.use('/mail',require('./mail'))
exports = module.exports = {
    route
}