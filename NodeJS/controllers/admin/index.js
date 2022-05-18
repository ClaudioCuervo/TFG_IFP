const router = require('express').Router()
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const conexion = require('../../database/db')
const session = require('express-session')


const auth = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null

        res.render('admin/login', {
            message: message
        })
    } 
     catch (error) {
        console.log(error)
    }
}

const registerView = async (req, res) => {
    try {
        if (req.session.user !== undefined) {

        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null

        res.render('admin/dashboard/users', {
            message: message,
            session: req.session
        })
        console.log(req.session)
    } else {
        let message = JSON.stringify({
            title: `No has iniciado sesión`,
            text: 'Por favor, inicia sesión.',
            type: 'error'
        })
        res.redirect(`/admin?message=${message}`)
        console.log('Session required')
    }
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
        res.redirect(`/admin?message=${message}`)
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
        res.redirect(`/admin?message=${message}`)
    } else {
        let message = JSON.stringify({
            title: `No has iniciado sesión`,
            text: 'Por favor, inicia sesión.',
            type: 'error'
        })
        res.redirect(`/admin?message=${message}`)
        console.log('Session required')
    }
    } catch (error) {
        console.log(error)
    }
}

const registrarPlato = async (req, res) => {
    try {
        req.headers['Content-Type'] = 'text/html'
        req.headers['charset'] = 'utf-8'
        res.charset = 'utf-8'

        let input_values = [
            req.body['titulo'],
            req.body['descripcion'],
            req.body['precio'],
            req.body['categoria']
        ]

        const sql = `INSERT INTO menu (titulo, detalles, precio, categoria) VALUES ('${input_values [0]}', '${input_values [1]}', '${input_values [2]}', '${input_values [3]}');`
        console.log(sql);
        conexion.query(sql, (error) => {
            if (error) {
                let message = JSON.stringify({
                    title: `Error`,
                    text: 'Intenta de nuevo más tarde.',
                    type: 'error'
                })
                res.redirect(`/admin/dashboard?message=${message}`)
                console.log(error)
            } else {
                let message = JSON.stringify({
                    title: `Plato registrado`,
                    text: `Hemos agregado ${input_values [0]} a la sección de ${input_values [3]} en el Menú!`,
                    type: 'success'
                }) 
                res.redirect(`/admin/dashboard?message=${message}`)
            }

        })
    } catch (error) {
        console.log(error)

    }
}





module.exports = {
    auth: auth,
    dashboard: dashboard,
    registerView: registerView,
    logout: logout,
    registrarPlato: registrarPlato
}