class RecibirItems {
    constructor({

        numeroComprobante,
        fechaRecepcion,
        montoAdeuda,
        transportista,
        numeroReciboInventario,
        idProveedor,
        idEmpleado,
        idNumeroOrdenCompra,
        idCodigoFactura

    }) {
        this.numeroComprobante = numeroComprobante;
        this.fechaRecepcion = fechaRecepcion;
        this.montoAdeuda = montoAdeuda;
        this.transportista = transportista;
        this.numeroReciboInventario = numeroReciboInventario;
        this.idProveedor = idProveedor;
        this.idEmpleado = idEmpleado;
        this.idNumeroOrdenCompra = idNumeroOrdenCompra;
        this.idCodigoFactura = idCodigoFactura;
    }
}

module.exports = RecibirItems;