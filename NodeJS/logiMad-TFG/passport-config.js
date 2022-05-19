var LocalStrategy = require('passport-local').Strategy
var connection = require('./database/db')
const bcrypt = require('bcryptjs')


module.exports = function (passport) {


    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });


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


                    var userName = req.body.name
                    var surName = req.body.surname
                    var phone = req.body.phone
                    var newUserMysql = new Object()

                    newUserMysql.email = email
                    newUserMysql.password = hashedPassword

                    var insertQuery = `INSERT INTO users ( name, surname, password, mail, phone ) values ('${userName}', '${surName}', '${hashedPassword}', '${email}', '${phone}')`
                    console.log(insertQuery)
                    connection.query(insertQuery, function (err, rows, results) {
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
            var query = "SELECT * FROM `users` WHERE `mail` = '" + email + "'"
            console.log(query);

            connection.query(query, async function (err, rows) {
                if (err)
                    return done(err)
                if (!rows.length) {
                    return done(null, false, console.log('No user found.'))
                }
                const isPasswordMatching = await bcrypt.compare(password, rows[0].password);
                

                if (!(isPasswordMatching)) {

                    return done(null, false, console.log('Oops! Wrong password.'))
                    
                } else {

                    req.session.user = {
                        name: rows[0].name,
                        mail: rows[0].mail,
                        phone: rows[0].phone
                    }

                    console.log(req.session)
                    return done(null, rows[0])
                }
            })
        }))
}