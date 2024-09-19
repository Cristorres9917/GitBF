const express = require('express');
const router = express.Router();
const { obtenerBajas, crearBaja, eliminarBaja } = require('../controllers/bajaproducto');

// Obtener todas las bajas de productos
router.get('/', obtenerBajas);

// Crear una nueva baja de producto
router.post('/', crearBaja);

// Eliminar una baja de producto por ID
router.delete('/:id', eliminarBaja);

module.exports = router;
