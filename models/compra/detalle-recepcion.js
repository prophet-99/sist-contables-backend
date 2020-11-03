class DetalleRecepcion {

    constructor({
        idNumeroItem,
        idNumeroComprobante,
        cantidadRecibida,
        costoUnitarioActual,
        observacion,
        estado_recepcion
    }) {
        this.idNumeroItem = idNumeroItem;
        this.idNumeroComprobante = idNumeroComprobante;
        this.cantidadRecibida = cantidadRecibida;
        this.costoUnitarioActual = costoUnitarioActual;
        this.observacion = observacion;
        this.estado_recepcion = estado_recepcion;
    }
}

module.exports = DetalleRecepcion;