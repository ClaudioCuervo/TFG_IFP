const router = require('express').Router()
const mysql = require('mysql');
const conexion = require('../../database/db');

const index = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        console.log(req.session)
        const sql = `
        SELECT
    addresses.address1,
    addresses.city,
    shipments.addresses_id_address,
    users.name,
    users.surname,
    (SELECT COUNT(users_id_user = ${req.session.user.id}) FROM shipments ) as userCount,
    (SELECT COUNT(addresses.users_id_user = ${req.session.user.id}) FROM addresses ) as userAddresses
FROM
    addresses
INNER JOIN users ON users.id_user = addresses.users_id_user
INNER JOIN shipments ON shipments.addresses_id_address = addresses.id_address
WHERE
    users.id_user = ${req.session.user.id};`
        console.log(sql)
        conexion.query(sql, (error, results) => {
            if (results[0] == undefined) {
                let message = JSON.stringify({
                    title: `¡Error!`,
                    text: 'No hemos podido completar tú solicitud.',
                    type: 'error'
                })
                res.redirect(`/?message=${message}`)
            } else {
                let data = results[0]
                res.render('profile/profile', {
                    message: message,
                    user: req.session.user,
                    data: data
                })
                console.log(data)
            }
        })

    } catch (error) {
        console.log(error)
    }
}

const settings = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        console.log(req.session)
        const sql = `SELECT
        addresses.address1,
        addresses.id_address,
        addresses.address2,
        addresses.city,
        addresses.zip,
        users.mail,
        users.phone
    FROM
        addresses
    INNER JOIN users ON users.id_user = addresses.users_id_user
    WHERE
        addresses.id_address = ${req.query.id}`
        
        conexion.query(sql, (error, results) => {
            if (results[0] == undefined) {
                let message = JSON.stringify({
                    title: `¡Error!`,
                    text: 'No hemos podido encontrar tu dirección.',
                    type: 'error'
                })
                res.redirect(`/?message=${message}`)
            } else {
                let data = results[0]
                res.render('profile/settings', {
                    message: message,
                    user: req.session.user,
                    data: data
                })
                console.log(data)
            }
        })

    } catch (error) {
        console.log(error)
    }
}

const updateSettings = async (req, res) => {
    try {
        req.headers['Content-Type'] = 'text/html'
        req.headers['charset'] = 'utf-8'
        res.charset = 'utf-8'
        let input_values = [
            req.body['address1'],
            req.body['address2'],
            req.body['city'],
            req.body['zip']
        ]
        console.log(req.body)
        const sql = `UPDATE addresses
        INNER JOIN users ON users_id_user = addresses.users_id_user
        SET addresses.address1 = '${input_values[0]}',
        addresses.address2 = '${input_values[1]}',
        addresses.city = '${input_values[2]}',
        addresses.zip = '${input_values[3]}'
        WHERE id_address = ${req.query.id}`
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
                    title: `¡Datos actualizados!`,
                    text: 'Tus datos han sido registrados con éxito.',
                    type: 'success'
                }) 
                res.redirect(`/?message=${message}`)
            }
        })


    } catch (error) {
        console.log(error)

    }
}

const shipments = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        console.log(req.session)
        const sql = `SELECT users.name, users.surname, addresses.users_id_user, addresses.id_address, addresses.address1, addresses.address2, addresses.zip, addresses.city, addresses.country FROM addresses INNER JOIN users ON users.id_user = addresses.users_id_user WHERE users_id_user = ${req.session.user.id}`
        
        conexion.query(sql, (error, results) => {
            if (results[0] == undefined) {
                let message = JSON.stringify({
                    title: `¡Error!`,
                    text: 'No hemos podido completar tú solicitud.',
                    type: 'error'
                })
                res.redirect(`/?message=${message}`)
            } else {
                let data = results
                res.render('profile/shipments', {
                    message: message,
                    user: req.session.user,
                    data: data
                })
                console.log(data)
            }
        })

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    index: index,
    settings: settings,
    updateSettings: updateSettings,
    shipments: shipments
}