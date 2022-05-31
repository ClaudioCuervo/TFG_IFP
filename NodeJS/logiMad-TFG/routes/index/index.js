const router = require ('express').Router ()
const index = require ('../../controllers/index/index')
const profile = require ('../../controllers/index/profile')


router.get ('/', index.index)
router.post ('/postFull', index.addMessage)
router.get ('/contact', index.contact)
router.get ('/faq', index.faq)
router.get ('/about', index.about)

// Perfil de usuaurio
router.get ('/profile', profile.index)
router.get ('/profile/my-ships', profile.shipments)
router.get ('/profile/settings', profile.settings)
router.post ('/update-settings/:id', profile.updateSettings)


module.exports.router = router
