const router = require ('express').Router ()
const index = require ('../../controllers/index/index')


router.get ('/', index.index)
router.get ('/verMensajes', index.ver)
router.post ('/postFull', index.addMessage)
router.post ('/post', index.addMessage2)

router.get ('/contact', index.contact)


module.exports.router = router
