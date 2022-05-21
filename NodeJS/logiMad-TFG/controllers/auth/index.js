const router = require('express').Router()
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const conexion = require('../../database/db')
const session = require('express-session')


const auth = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        var user = req.session.user
        res.render('auth/login', {
            message: message,
            user: user
        })
    } 
     catch (error) {
        console.log(error)
    }
}

const registerView = async (req, res) => {
    try {
        

        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        var user = req.session.user
        res.render('auth/register', {
            message: message,
            user: user
        })
    
    } catch (error) {
        console.log(error)
    }
}

const logout = async (req, res) => {
    try {
        if (req.session.user !== undefined) {
        req.session.destroy()
        let message = JSON.stringify({
            title: `¡Hasta pronto!`,
            text: 'Has cerrado sesión correctamente.',
            type: 'success'
        })
        res.redirect(`/?message=${message}`)
    } else {
        let message = JSON.stringify({
            title: `No has iniciado sesión`,
            text: 'Por favor, inicia sesión.',
            type: 'error'
        })
        res.redirect(`/?message=${message}`)
        console.log('Session required')
    }
    } catch (error) {
        console.log(error)
    }
}





module.exports = {
    auth: auth,
    registerView: registerView,
    logout: logout
}