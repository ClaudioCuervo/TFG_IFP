const router = require('express').Router()
const mysql = require('mysql');
const conexion = require('../../database/db');


const print_date = (date) => {
	let dias_semana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
	let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
	let formatted_date = dias_semana [date.getDay ()] + ', ' + date.getDate () + ' de ' + meses [date.getMonth ()] + ' del ' + date.getFullYear ()
	return capitalize (formatted_date);
}

function capitalize (string) {
    return string.charAt (0).toUpperCase () + string.slice (1)
}

const index = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null

        const sql = `SELECT
        addresses.address1,
        addresses.city,
        shipments.addresses_id_address,
        users.name,
        users.surname,
        shipments.recipient,
        shipments.id_shipment,
        shipment_status.date
    FROM
        addresses
    INNER JOIN users ON users.id_user = addresses.users_id_user
    INNER JOIN shipments ON shipments.addresses_id_address = addresses.id_address
    INNER JOIN shipment_status ON shipment_status.shipments_id_shipment = shipments.id_shipment
    WHERE shipments.users_id_user = ${req.session.user.id}`
        console.log(sql)
        conexion.query(sql, (error, results) => {
            if (results[0] == undefined) {
                let message = JSON.stringify({
                    title: `¡Error!`,
                    text: 'No tienes ningún pedido para trackearlo.',
                    type: 'warning'
                }) 
                res.redirect(`/ship/address?message=${message}`)
            } else {
                let data = results
                res.render('index/tracking', {
                    message: message,
                    user: req.session.user,
                    data: data,
                    print_date: print_date
                })
                console.log(data)
            }
        })

    } catch (error) {
        console.log(error)
    }
}


const result = async (req, res) => {
    try {

        req.headers['Content-Type'] = 'text/html'
        req.headers['charset'] = 'utf-8'
        res.charset = 'utf-8'

        var code = req.query.trackCode
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null

        const sql = `SELECT status.status, status.id_status, shipment_status.date, shipments.recipient,
         shipment_status.date FROM shipment_status 
        INNER JOIN status ON status.id_status = shipment_status.status_id_status 
        INNER JOIN shipments ON shipments.id_shipment = shipment_status.shipments_id_shipment 
        WHERE shipments_id_shipment = ${code};`
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
                res.render('index/result', {
                    message: message,
                    user: req.session.user,
                    data: data
                })
                console.log(data)
            }
        })

    } catch (error) {
        let message = JSON.stringify({
            title: `¡Error!`,
            text: 'No hemos podido completar tú solicitud.',
            type: 'error'
        }) 
        res.redirect(`/?message=${message}`)
        console.log(error)
    }
}


module.exports = {
    index: index,
    result: result
}