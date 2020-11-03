class DesembolsoEfectivo {

    constructor({
        id,
        idDesembolsoEfectivo,
        idProveedor,
        idNumeroOrdenCompra,
        idCodigoFactura
    }) {
        this.id = id;
        this.idDesembolsoEfectivo = idDesembolsoEfectivo;
        this.idProveedor = idProveedor;
        this.idNumeroOrdenCompra = idNumeroOrdenCompra;
        this.idCodigoFactura = idCodigoFactura;

    }
}

module.exports = DesembolsoEfectivo;