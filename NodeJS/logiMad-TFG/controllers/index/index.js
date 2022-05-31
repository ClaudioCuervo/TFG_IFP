const router = require('express').Router()
const mysql = require('mysql');
const conexion = require('../../database/db');

const index = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        console.log(req.session)
        res.render('index/index', {
            message: message,
            user: req.session.user
        })

    } catch (error) {
        console.log(error)
    }
}

const addMessage = async (req, res) => {
    try {
        req.headers['Content-Type'] = 'text/html'
        req.headers['charset'] = 'utf-8'
        res.charset = 'utf-8'
        let input_values = [
            req.body['names'],
            req.body['email'],
            req.body['message']
        ]
        const sql = `INSERT INTO messages (names, email, message) VALUES ('${input_values [0]}', '${input_values [1]}', '${input_values [2]}');`
        console.log(sql);
        conexion.query(sql, (error) => {
            if (error) {
                let message = JSON.stringify({
                    title: `Error`,
                    text: 'Intenta de nuevo más tarde.',
                    type: 'error'
                })
                res.redirect(`/?message=${message}`)
                console.log(error)
            } else {
                let message = JSON.stringify({
                    title: `¡Gracias!`,
                    text: 'Hemos recibido tu mensaje, pronto nos pondremos en contacto contigo.',
                    type: 'success'
                }) 
                res.redirect(`/?message=${message}`)
            }
        })


    } catch (error) {
        console.log(error)

    }
}

const contact = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        console.log(req.session)
        res.render('index/contact', {
            message: message,
            user: req.session.user
        })

    } catch (error) {
        console.log(error)
    }
}

const faq = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        console.log(req.session)
        res.render('index/faq', {
            message: message,
            user: req.session.user
        })

    } catch (error) {
        console.log(error)
    }
}

const about = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        console.log(req.session)
        res.render('index/about', {
            message: message,
            user: req.session.user
        })

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    index: index,
    addMessage: addMessage,
    contact: contact,
    faq: faq,
    about: about
}