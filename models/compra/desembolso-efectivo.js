class DesembolsoEfectivo {
    constructor({
        monto,
        fecha,
        idEmpleado,
        idNumeroCuenta,
        idNumeroOrdenCompra,
        idCodigoFactura,
        idProveedor
    }) {
        this.monto = monto;
        this.fecha = fecha;
        this.idEmpleado = idEmpleado;
        this.idNumeroCuenta = idNumeroCuenta;
        this.idNumeroOrdenCompra = idNumeroOrdenCompra;
        this.idCodigoFactura = idCodigoFactura;
        this.idProveedor = idProveedor;
    }
}

module.exports = DesembolsoEfectivo;