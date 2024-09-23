const { Router } = require('express');
const { crearProducto, obtenerProductos, obtenerProductoPorId, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');

const router = Router();

// Crear un nuevo producto
router.post('/', [
    check('nombreProducto', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio y debe ser un número').isNumeric(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    validarCampos
], crearProducto);

// Obtener todos los productos
router.get('/', obtenerProductos);

// Obtener un producto por ID
router.get('/:id', obtenerProductoPorId);

// Actualizar un producto
router.put('/:id', [
    check('nombreProducto', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio y debe ser un número').isNumeric(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    validarCampos
], actualizarProducto);

// Eliminar un producto
router.delete('/:id', eliminarProducto);

module.exports = router;
