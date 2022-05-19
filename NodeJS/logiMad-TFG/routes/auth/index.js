const router = require ('express').Router ()
const auth = require ('../../controllers/auth/index')
const passportConfig = require('../../passport-config')
const passport = require('passport')
passportConfig(passport)

router.get ('/login', auth.auth)
router.get ('/dashboard', auth.dashboard)
router.get ('/register', auth.registerView)
router.get ('/logout', auth.logout)

// Auth
router.post ('/register', 
passport.authenticate('local-signup', { 
    successRedirect: `/`,
    failureRedirect: `/error`, 
    failWithError: 'true'
}))
router.post ('/signin', 
passport.authenticate('local-login', { 
    successRedirect: `/`,
    failureRedirect: `/error`, 
    failWithError: 'true'
}))



module.exports.router = router
