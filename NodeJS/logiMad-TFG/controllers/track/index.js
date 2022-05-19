const router = require('express').Router()
const mysql = require('mysql');
const conexion = require('../../database/db');

const index = async (req, res) => {
    try {
        const message = (req.query['message'] !== null && req.query['message'] !== undefined && req.query['message'] !== '') ? JSON.parse(req.query['message']) : null

        res.render('index/tracking', {
            message: message
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    index: index
}