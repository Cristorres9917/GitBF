const BajaProducto = require('../models/BajaProducto');
const Insumo = require('../models/Insumo'); // Asegúrate de tener este modelo para verificar los productos

// Obtener todas las bajas de productos
const obtenerBajasProductos = async (req, res) => {
    try {
        const bajas = await BajaProducto.find();
        res.json(bajas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las bajas de productos', error });
    }
};

// Crear una nueva baja de producto
const crearBajaProducto = async (req, res) => {
    const { productoId, fechaBaja, cantidad, observaciones } = req.body;

    try {
        // Verificar que el producto existe en la tabla de insumos
        const insumo = await Insumo.findById(productoId);
        if (!insumo) {
            return res.status(404).json({ message: 'Producto no encontrado en insumos' });
        }

        // Crear la nueva baja
        const nuevaBaja = new BajaProducto({
            producto: insumo.nombre, // Utiliza el nombre del producto del insumo
            fechaBaja,
            cantidad,
            observaciones
        });

        await nuevaBaja.save();

        // Actualizar el estado del insumo si es necesario (opcional)
        // insumo.estado = 'Baja'; // Si tienes un campo de estado en Insumo
        // await insumo.save();

        res.status(201).json({ message: 'Baja de producto creada con éxito', baja: nuevaBaja });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la baja de producto', error });
    }
};

// Actualizar una baja de producto por ID
const actualizarBajaProducto = async (req, res) => {
    const { id } = req.params;
    const { producto, fechaBaja, cantidad, observaciones } = req.body;

    try {
        const bajaActualizada = await BajaProducto.findByIdAndUpdate(
            id,
            { producto, fechaBaja, cantidad, observaciones },
            { new: true }
        );

        if (!bajaActualizada) {
            return res.status(404).json({ message: 'Baja de producto no encontrada' });
        }

        res.json({ message: 'Baja de producto actualizada con éxito', baja: bajaActualizada });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la baja de producto', error });
    }
};

// Eliminar una baja de producto por ID
const eliminarBajaProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const bajaEliminada = await BajaProducto.findByIdAndDelete(id);

        if (!bajaEliminada) {
            return res.status(404).json({ message: 'Baja de producto no encontrada' });
        }

        res.json({ message: 'Baja de producto eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la baja de producto', error });
    }
};

// Cambiar el estado de una baja de producto por ID
const cambiarEstadoBajaProducto = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const baja = await BajaProducto.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );

        if (!baja) {
            return res.status(404).json({ message: 'Baja de producto no encontrada' });
        }

        res.json({ message: 'Estado de la baja de producto actualizado', baja });
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado de la baja de producto', error });
    }
};

module.exports = {
    obtenerBajasProductos,
    crearBajaProducto,
    actualizarBajaProducto,
    eliminarBajaProducto,
    cambiarEstadoBajaProducto
};
