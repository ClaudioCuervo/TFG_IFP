const router = require ('express').Router ()
const admin = require ('../../controllers/admin/index')
const passportConfig = require('../../passport-config')
const passport = require('passport')
passportConfig(passport)

router.get ('/', admin.auth)
router.get ('/dashboard', admin.dashboard)
router.get ('/dashboard/users', admin.registerView)
router.get ('/logout', admin.logout)

// Auth
router.post ('/register', 
passport.authenticate('local-signup', { 
    successRedirect: `/admin/dashboard/users`,
    failureRedirect: `/`, 
    failWithError: 'true'
}))
router.post ('/signin', 
passport.authenticate('local-login', { 
    successRedirect: `/admin/dashboard`,
    failureRedirect: `/`, 
    failWithError: 'true'
}))



module.exports.router = router
