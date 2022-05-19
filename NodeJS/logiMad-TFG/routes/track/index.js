const router = require ('express').Router ()
const track = require ('../../controllers/track/index')


router.get ('/', track.index)

module.exports.router = router
