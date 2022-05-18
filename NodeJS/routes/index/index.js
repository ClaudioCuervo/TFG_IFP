const router = require ('express').Router ()
const index = require ('../../controllers/index/index')

router.get ('/', index.index)


module.exports.router = router
