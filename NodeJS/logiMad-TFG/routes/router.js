const router = require('express').Router ()


router.use ('/', require('./index/').router)
router.use ('/auth', require('./auth/').router)
router.use ('/track', require('./track/').router)
router.use ('/ship', require('./user/').router)


module.exports.router = router
