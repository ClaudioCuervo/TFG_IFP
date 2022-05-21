const router = require('express').Router()
const mysql = require('mysql');
const conexion = require('../../database/db');

const index = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null

        res.render('index/tracking', {
            message: message,
            user: req.session.user
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