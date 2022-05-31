const router = require ('express').Router ()
const user = require ('../../controllers/user/index')


router.get ('/', user.ship)
router.get ('/address', user.address)
router.post ('/push-address', user.shipment)
router.post ('/add-address', user.addAddress)
router.get ('/delete-address', user.deleteAddress)

module.exports.router = router
