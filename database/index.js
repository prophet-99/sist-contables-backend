const mysql = require('mysql');
const { promisify } = require('util');
const { sql } = require('./../config');
const auth = require('./../models/auth');
const usuario = require('./../models/usuario');
const empleado = require('./../models/empleado');
const cliente = require('./../models/cliente');
const proveedor = require('./../models/proveedor');
const inventario = require('./../models/inventario');
const compra = require('./../models/compra');
const nomina = require('./../models/nomina');

class MySQLServerConnection{
    static instance;
    poolConnection;

    constructor(){
        if (!!MySQLServerConnection.instance){
            return MySQLServerConnection.instance;
        }
        MySQLServerConnection.instance = this;
        this.getConnection();
    }

    closeConnection(){
        this.poolConnection.end( (err) => {
            this.poolConnection = null;
            console.log(err);
        } );
    }

    getConnection(){
        if (this.poolConnection) {
            this.poolConnection.query = promisify(this.poolConnection.query);
            return this.poolConnection;
        }

        this.poolConnection = mysql.createPool(sql);
        this.poolConnection.getConnection( (err, connection) => {
            if (err){
                if (err.code === 'PROTOCOL_CONNECTION_LOST') console.error('Database connection was closed');
                if (err.code === 'ER_CON_COUNT_ERROR') console.error('Database has to many connections');
                if (err.code === 'ECONNREFUSED') console.error('Database connection was refused');
            }
            if(connection) connection.release();

            return;
        } );
    }

    async getRepositories(){
        const connection = this.getConnection();    
        return {
            usuarioRepository: usuario.register({ connection }),
            authRepository: auth.register({ connection }),
            empleadoRepository: empleado.register({ connection }),
            clienteRepository: cliente.register({ connection }),
            proveedorRepository: proveedor.register({ connection }),
            inventarioRepository: inventario.register({ connection }),
            compraRepository: compra.register({ connection }),
            nominaRepository: nomina.register({ connection })
        }
    }
}

module.exports = new MySQLServerConnection();


