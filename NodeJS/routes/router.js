const router = require('express').Router ()


router.use ('/', require('./index/').router)
router.use ('/admin', require('./admin/').router)



module.exports.router = router
