class EnvioItems {
    constructor({
        id,
        importe,
        fechaEnvio,
        fechaCierre,
        numeroComprobante,
        idNumeroCliente,
        idEmpleado,
        idNumeroOrden,
        idCodigoFacturaCliente

    }) {
        this.id = id;
        this.importe = importe;
        this.fechaEnvio = fechaEnvio;
        this.fechaCierre = fechaCierre;
        this.numeroComprobante = numeroComprobante;
        this.idNumeroCliente = idNumeroCliente;
        this.idEmpleado = idEmpleado;
        this.idNumeroOrden = idNumeroOrden;
        this.idCodigoFacturaCliente = idCodigoFacturaCliente;
    }
}

module.exports = EnvioItems;