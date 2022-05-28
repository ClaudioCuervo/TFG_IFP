const router = require('express').Router()
const mysql = require('mysql');
const conexion = require('../../database/db');

const ship = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        let user_id =  req.session.user.id
        const sql = `SELECT * from addresses WHERE users_id_user = ${user_id} ;`
        conexion.query(sql, (error, results) => {
            if (results[0]) {
                res.redirect('/ship/address')
            } else {
                let data = results
                console.log(results)
                res.render('user/ship', {
                    message: message,
                    user: req.session.user,
                    data: data
                })
            }
        })

    } catch (error) {
        console.log(error)
    }
}

const shipment = async (req, res) => {
    try {
        req.headers['Content-Type'] = 'text/html'
        req.headers['charset'] = 'utf-8'
        res.charset = 'utf-8'

        let input_values = [
            req.body['address1'],
            req.body['address2'],
            req.body['zip'],
            req.body['city'],
            req.body['country'],
            req.body['user_id']
        ]
        const sql = `INSERT INTO addresses (address1, address2, zip, city, country, users_id_user) VALUES ('${input_values [0]}', '${input_values [1]}', '${input_values [2]}', '${input_values [3]}', '${input_values [4]}', '${input_values [5]}');`
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
                console.log('se insertó correctamente la dirección')
                res.redirect('/ship/address')
            }
        })


    } catch (error) {
        console.log(error)

    }
}

const address = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        let user_id =  req.session.user.id
        const sql = `SELECT * from addresses WHERE users_id_user = ${user_id} ;`
        conexion.query(sql, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                let data = results[0]
                console.log(data)
                res.render('user/address', {
                    message: message,
                    user: req.session.user,
                    data: data
                })
            }
        })

    } catch (error) {
        console.log(error)
    }
}

const addAddress = async (req, res) => {
    try {
        req.headers['Content-Type'] = 'text/html'
        req.headers['charset'] = 'utf-8'
        res.charset = 'utf-8'

        let input_values = [
            req.body['recipient'],
            req.body['instructions'],
            req.body['measures'],
            req.body['weight'],
            req.body['user_id'],
            req.body['address_id']
        ]
        const sql = `INSERT INTO shipments (recipient, instructions, measures, weight, users_id_user, addresses_id_address) VALUES ('${input_values [0]}', '${input_values [1]}', '${input_values [2]}', '${input_values [3]}', '${input_values [4]}', '${input_values [5]}');`
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
                    title: `¡Enviado!`,
                    text: 'Tu paquete ha sido enviado con éxito.',
                    type: 'success'
                })
                res.redirect(`/?message=${message}`)
            }
        })


    } catch (error) {
        console.log(error)

    }
}


module.exports = {
    ship: ship,
    shipment: shipment,
    address: address,
    addAddress: addAddress
}