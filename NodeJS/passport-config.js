var LocalStrategy = require('passport-local').Strategy
var connection = require('./database/db')
const bcrypt = require('bcryptjs')


module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        connection.query("select * from users where id = " + id, function (err, rows) {
            done(err, rows[0])
        })
    })


    var hashedPassword = ''
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            connection.query("select * from users where mail = '" + email + "'", async function (err, rows) {
                console.log(rows)
                console.log("above row object")
                if (err)
                    return done(err)
                if (rows.length) {
                    return done(null, false, console.log('signupMessage', 'That email is already taken.'))
                } else {

                    const salt = await bcrypt.genSalt(10);
                    hashedPassword = await bcrypt.hash(password, salt);


                    var user = req.body.name
                    var newUserMysql = new Object()

                    newUserMysql.email = email
                    newUserMysql.password = hashedPassword

                    var insertQuery = "INSERT INTO users ( mail, password, name ) values ('" + email + "','" + hashedPassword + "','" + user + "')"
                    console.log(insertQuery)
                    connection.query(insertQuery, function (err, rows) {
                        newUserMysql.id = rows.insertId

                        return done(null, newUserMysql)
                    })
                }
            })
        }))

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            connection.query("SELECT * FROM `users` WHERE `mail` = '" + email + "'", async function (err, rows) {
                if (err)
                    return done(err)
                if (!rows.length) {
                    return done(null, false, console.log('No user found.'))
                }
                const isPasswordMatching = await bcrypt.compare(password, rows[0].password);
                console.log(isPasswordMatching)

                if (!(isPasswordMatching)) {

                    return done(null, false, console.log('Oops! Wrong password.'))
                    
                } else {

                    req.session.user = {
                        name: rows[0].name
                    }

                    console.log(req.session)
                    return done(null, rows[0])
                }
            })



        }))

}