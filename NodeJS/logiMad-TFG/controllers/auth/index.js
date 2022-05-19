const router = require('express').Router()
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const conexion = require('../../database/db')
const session = require('express-session')


const auth = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null

        res.render('auth/login', {
            message: message
        })
    } 
     catch (error) {
        console.log(error)
    }
}

const registerView = async (req, res) => {
    try {
        

        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null

        res.render('auth/register', {
            message: message
        })
    
    } catch (error) {
        console.log(error)
    }
}

const dashboard = async (req, res) => {
    try {
        if (req.session.user !== undefined) {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        const sql = `SELECT * FROM users`
            conexion.query(sql, function (error, results) {
                if (error){
                    console.log('Error con la base de datos')
                } else {
                    res.render('admin/dashboard/index', {
                        session: req.session,
                        message: message,
                        user: results
                    })
                }
        })
        
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
    dashboard: dashboard,
    registerView: registerView,
    logout: logout
}