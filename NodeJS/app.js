const express = require('express')
var session = require('express-session')
const app = express()
const path = require ('path')
const body_parser = require ('body-parser')
const router = require ('./routes/router')
const passport = require('passport')
var MySQLStore = require('connect-mysql')(session) // mysql session store
var options = {
      config: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hm'
      }}


app.set('view engine', 'ejs')
app.set ('views', path.join(__dirname, '/views'))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
       maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    },
    store: new MySQLStore(options)
 }));

app.use (body_parser.urlencoded ({ extended: true }))
// app.use (express.urlencoded ({ extended: true }))
app.use ('/public', express.static (path.join(__dirname, 'public')))
app.use(express.json())
app.use(router.router)
app.use(passport.initialize())
app.use(passport.session())
app.get("*", (req, res) => {
	res.render(__dirname + '/views/partials/error.ejs')
})

app.use ((req, res, next) => {
	if (req.session.user == undefined) {
		res.header ('Cache-Control', 'private, no-cache, no-store, must-revalidate')
	}
	next ()
})

app.listen(5000, ()=>{
    console.log('puerto 5000')
})



module.exports = app