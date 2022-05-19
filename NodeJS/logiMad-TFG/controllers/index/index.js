const router = require('express').Router()
const mysql = require('mysql');
const conexion = require('../../database/db');

const index = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        console.log(req.session)
        res.render('index/index', {
            message: message
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
            req.body['nombre2'],
            req.body['correo2'],
            req.body['movil2'],
            req.body['ciudadOrigen2'],
            req.body['ciudadDestino2']
        ]
        const sql = `INSERT INTO messages (nombre, correo, movil, ciudadOrigen, ciudadDestino) VALUES ('${input_values [0]}', '${input_values [1]}', '${input_values [2]}', '${input_values [3]}', '${input_values [4]}');`
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
                    text: 'Hemos recibido tus datos, pronto nos pondremos en contacto contigo.',
                    type: 'success'
                }) 
                res.redirect(`/?message=${message}`)
            }
        })


    } catch (error) {
        console.log(error)

    }
}

const addMessage2 = async (req, res) => {
    try {
        req.headers['Content-Type'] = 'text/html'
        req.headers['charset'] = 'utf-8'
        res.charset = 'utf-8'
        let input_values = [
            req.body['nombre'],
            req.body['correo'],
            req.body['descripcion'],
        ]
        const sql = `INSERT INTO messages (nombre, correo, movil, ciudadOrigen, ciudadDestino, descripcion) VALUES ('${input_values [0]}', '${input_values [1]}', '', '', '', '${input_values [5]}');`
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
                    text: 'Hemos recibido tus datos, pronto nos pondremos en contacto contigo.',
                    type: 'success'
                }) 
                res.redirect(`/?message=${message}`)
            }
        })


    } catch (error) {
        console.log(error)

    }
}

const ver = async (req, res) => {
    try {
       
        const sql = `SELECT * from messages`
        console.log(sql);
        conexion.query(sql, (error, results) => {
            if (error) {
                let message = JSON.stringify({
                    title: `Error`,
                    text: 'Intenta de nuevo más tarde.',
                    type: 'error'
                })
                res.redirect(`/?message=${message}`)
                console.log(error)
            } else {
                console.log(results.recordset)
                res.render('index/ver', {
                    results: results
                })
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
            message: message
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
            message: message
        })

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    index: index,
    addMessage: addMessage,
    addMessage2: addMessage2,
    ver: ver,
    contact: contact,
    faq: faq
}