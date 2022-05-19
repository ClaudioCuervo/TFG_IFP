const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'logimad1'
})
conexion.connect((error)=>{
    if(error){
        console.error('error de conexion: ' + error);
        return
    }
    console.log('Conexion completada!');
})

module.exports = conexion;