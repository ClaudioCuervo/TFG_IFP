const router = require ('express').Router ()
const user = require ('../../controllers/user/index')


router.get ('/', user.ship)
router.get ('/address', user.address)
router.post ('/push-address', user.shipment)
router.post ('/add-address', user.addAddress)

module.exports.router = router
