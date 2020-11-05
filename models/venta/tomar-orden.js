class TomarOrden {
    constructor({

        numeroOrden,
        fechaPedido,
        fechaPrometida,
        condiciones,
        idVerificarDisponibilidad,
        idNumeroCliente,
        idEmpleado

    }) {
        this.numeroOrden = numeroOrden;
        this.fechaPedido = fechaPedido;
        this.fechaPrometida = fechaPrometida;
        this.condiciones = condiciones;
        this.idVerificarDisponibilidad = idVerificarDisponibilidad;
        this.idNumeroCliente = idNumeroCliente;
        this.idEmpleado = idEmpleado;
    }
}

module.exports = TomarOrden;