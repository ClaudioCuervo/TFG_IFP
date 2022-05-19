const router = require ('express').Router ()
const index = require ('../../controllers/index/index')


router.get ('/', index.index)
router.post ('/postFull', index.addMessage)
router.get ('/contact', index.contact)
router.get ('/faq', index.faq)


module.exports.router = router
