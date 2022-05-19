const router = require('express').Router ()


router.use ('/', require('./index/').router)
router.use ('/auth', require('./auth/').router)
router.use ('/track', require('./track/').router)


module.exports.router = router
