const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


// Configurar la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Configuración de conexión a MySQL
const db = mysql.createConnection({
    host: 'bbnnti4wyhacm6cvj05f-mysql.services.clever-cloud.com',
    user: 'ur1hp8tkqj43h4py', // Cambia esto por el usuario correcto
    password: 'QbunSgYVZw6YUXikv6qy', // Cambia esto por la contraseña correcta
    database: 'bbnnti4wyhacm6cvj05f',
    port: '3306'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos huerta');
});

// Habilitar CORS para todas las rutas
app.use(cors());


// Nueva ruta para insertar datos en la tabla "plantas" desde la URL
app.get('/api/insertarPlanta', (req, res) => {
    const { numHuerta, temperatura, humedad } = req.query;

    // Generar fecha y hora actuales en el servidor
    const fecha = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
    const hora = new Date().toTimeString().split(' ')[0]; // Obtiene la hora en formato HH:MM:SS

    // Consulta SQL para insertar los datos en la tabla plantas
    const sql = `INSERT INTO huerta (numHuerta, fecha, hora, temperatura, humedad) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [numHuerta, fecha, hora, parseFloat(temperatura), parseFloat(humedad)], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al insertar los datos');
        } else {
            res.send('Datos insertados correctamente');
        }
    });
});



// Ruta para obtener el último dato de temperatura
app.get('/api/ultimaTemperatura', (req, res) => {
    const sql = 'SELECT Temperatura FROM huerta ORDER BY id DESC LIMIT 1';

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener la última temperatura');
        } else {
            // Enviar solo el valor de temperatura si hay resultados
            if (result.length > 0) {
                res.send(result[0].Temperatura.toString());
            } else {
                res.send('No hay datos disponibles');
            }
        }
    });
});


app.get('/api/promedioSemanal', (req, res) => {
    const query = 'SELECT fecha, AVG(temperatura) AS promedio_temperatura FROM huerta WHERE fecha >= CURDATE() - INTERVAL 7 DAY GROUP BY fecha ORDER BY fecha; '; 
    
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);  // Enviar los datos en formato JSON
    });
});
app.get('/api/temperaturas', (req, res) => {
    const query = 'SELECT * FROM huerta ORDER BY id LIMIT 5'; // Obtener las últimas 5 lecturas
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);  // Enviar los datos en formato JSON
    });
});

//Obtener la ultima medicion
app.get('/api/ultimaMedicion', (req, res) => {
    const query = 'SELECT fecha, temperatura, humedad FROM huerta ORDER BY id DESC LIMIT 1'; // Obtener las últimas 5 lecturas
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);  // Enviar los datos en formato JSON
    });
});

/* 
    Rutas grupo vicky
*/
// Nueva ruta para insertar datos en la tabla "plantas" desde la URL
app.get('/huerta1/insertarPlanta', (req, res) => {
    const {temperatura, humedad } = req.query;

    // Generar fecha y hora actuales en el servidor
    const fecha = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
    const hora = new Date().toTimeString().split(' ')[0]; // Obtiene la hora en formato HH:MM:SS

    // Consulta SQL para insertar los datos en la tabla plantas
    const sql = `INSERT INTO plantas (fecha, hora, temperatura, humedad) VALUES (?, ?, ?, ?)`;
    db.query(sql, [fecha, hora, parseFloat(temperatura), parseFloat(humedad)], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al insertar los datos');
        } else {
            res.send('Datos insertados correctamente');
        }
    });
});

// Ruta para obtener el último dato de temperatura
app.get('/huerta1/ultimosDatos', (req, res) => {
    const sql = 'SELECT * FROM plantas ORDER BY idPlanta DESC LIMIT 1';

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);  // Enviar los datos en formato JSON
    });
});


// Iniciar el servidor en el puerto 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});