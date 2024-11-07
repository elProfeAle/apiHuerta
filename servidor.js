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
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', // Cambia esto por el usuario correcto
    password: process.env.DB_PASSWORD || '', // Cambia esto por la contraseña correcta
    database: process.env.DB_NAME || 'huerta'
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
    const { NombrePlanta, Temperatura, Humedad } = req.query;

    // Consulta SQL para insertar los datos en la tabla plantas
    const sql = `INSERT INTO plantas (NombrePlanta, Temperatura, Humedad) VALUES (?, ?, ?)`;
    db.query(sql, [NombrePlanta, parseInt(Temperatura), parseInt(Humedad)], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al insertar los datos');
        } else {
            res.send('Datos insertados correctamente');
        }
    });
});
// Ruta para obtener el último dato de temperatura
app.get('/ultimaTemperatura', (req, res) => {
    const sql = 'SELECT Temperatura FROM plantas ORDER BY id DESC LIMIT 1';

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

app.get('/temperaturas', (req, res) => {
    const query = 'SELECT * FROM plantas'; // Obtener las últimas 5 lecturas
    db.query(query, (err, results) => {
        if (err) throw err;
      res.json(results);  // Enviar los datos en formato JSON
    });
});

// Iniciar el servidor en el puerto 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

/*
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});*/
