const express = require('express');
const router = express.Router();
const con = require('../conexion');

//AÑADIR
router.post('/add', (req, res) => {
    const sql = 'INSERT INTO estadio SET ?';
    const NewEstadio = {
        nombre: req.body.nombre,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        capacidad: req.body.capacidad,
        fecha_inaguracion: req.body.fecha_inaguracion
    }
    con.query(sql, NewEstadio, error => {
        if (error) {
            throw error;
        }
        res.send('Estadio Agregado');
    })
});

//LISTAR
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM estadio';
    con.query(sql, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No existen datos');
        }
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM estadio WHERE cod_estadio = ${id}`;
    con.query(sql, (error, result) => {
        if (error) {
            throw error;
        }
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('No existen datos');
        }
    })
});

//ELIMINAR
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM estadio WHERE cod_estadio = ${id}`;
    con.query(sql, error => {
        if (error) {
            throw error;
        }
        res.send('Estadio Eliminado');
    })
});

//EDITAR
router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, direccion, capacidad, fecha_inaguracion } = req.body;
    const sql = `UPDATE estadio SET nombre = '${nombre}', ciudad = '${ciudad}', direccion = '${direccion}', capacidad = ${capacidad}, fecha_inaguracion = '${fecha_inaguracion}' WHERE cod_estadio = ${id}`;
    con.query(sql, error => {
        if (error) {
            throw error;
        }
        res.send('Estadio Modificado');
    })
});

module.exports = router;