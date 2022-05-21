const router = require ('express').Router ()
const track = require ('../../controllers/track/index')


router.get ('/', track.index)
router.get ('/result', track.result)

module.exports.router = router
