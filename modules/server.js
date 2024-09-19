const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        // Definición de rutas
        this.usuariosPath = '/api/usuarios';
        this.rolesPath = '/api/roles';
        this.permisosPath = '/api/permisos';
        this.tiposerviciosPath = '/api/tiposervicios';
        this.proveedorPath = '/api/proveedores';  // Proveedor
        this.serviciosPath = '/api/servicios';
        this.detalleserviciosPath = '/api/detalleservicios';
        this.ventaserviciosPath = '/api/ventaservicios';
        this.authPath = '/api/auth';
        this.compraPath = '/api/compras';         // Compra
        this.bajaProductoPath = '/api/bajas';     // Baja de productos
        this.insumoPath = '/api/insumos';         // Insumo

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();

        // Conectar a la base de datos
        this.connectDb();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando por el puerto ${this.port}`);
        });
    }

    middlewares() {
        // CORS
        this.app.use(cors({
            origin: '*',
        }));

        // Parsing del body en JSON
        this.app.use(bodyParser.json());

        // Servir directorio público
        this.app.use(express.static(__dirname + "/public"));
    }

    routes() {
        // Rutas de usuarios, roles, permisos, servicios, etc.
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.rolesPath, require('../routes/roles'));
        this.app.use(this.permisosPath, require('../routes/permisos'));
        this.app.use(this.tiposerviciosPath, require('../routes/tiposervs'));
        this.app.use(this.serviciosPath, require('../routes/servicios'));
        this.app.use(this.detalleserviciosPath, require('../routes/detalleservicios'));
        this.app.use(this.ventaserviciosPath, require('../routes/ventaservicios'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.proveedorPath, require('../routes/proveedor'));  // Proveedor
        this.app.use(this.compraPath, require('../routes/compra'));        // Compra
        this.app.use(this.bajaProductoPath, require('../routes/bajaproducto'));  // Baja de Productos
        this.app.use(this.insumoPath, require('../routes/insumo'));        // Insumo
    }

    async connectDb() {
        await dbConnection();
    }
}

module.exports = Server;
