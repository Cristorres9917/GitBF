const { Router } = require('express');
const {
    obtenerBajasProductos,
    crearBajaProducto,
    actualizarBajaProducto,
    eliminarBajaProducto
} = require('../controllers/bajaproducto');

const router = Router();

// Obtener todas las bajas de productos
router.get('/', obtenerBajasProductos);

// Crear una nueva baja de producto
router.post('/', crearBajaProducto);

// Actualizar una baja de producto por ID
router.put('/:id', actualizarBajaProducto);

// Eliminar una baja de producto por ID
router.delete('/:id', eliminarBajaProducto);

module.exports = router;
