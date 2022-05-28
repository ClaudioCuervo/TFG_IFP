const router = require('express').Router()
const mysql = require('mysql');
const conexion = require('../../database/db');

const index = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null
        console.log(req.session)
        const sql = `SELECT addresses.address1, addresses.city, shipments.addresses_id_address, users.name, users.surname, COUNT(users.id_user = 1) as userCount FROM addresses INNER JOIN users ON users.id_user = addresses.users_id_user INNER JOIN shipments ON shipments.addresses_id_address = addresses.id_address WHERE users.id_user = ${req.session.user.id};`
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




module.exports = {
    index: index
}