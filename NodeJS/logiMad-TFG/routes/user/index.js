const router = require ('express').Router ()
const user = require ('../../controllers/user/index')


router.get ('/', user.ship)
router.post ('/push-address', user.shipment)

module.exports.router = router
