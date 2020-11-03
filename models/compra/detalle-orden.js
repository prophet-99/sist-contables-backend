class DetalleOrden {

    constructor({
        idNumeroItem,
        idNumeroOrdenCompra,
        cantidad,
        precioUnitarioCompra
    }) {
        this.idNumeroItem = idNumeroItem;
        this.idNumeroOrdenCompra = idNumeroOrdenCompra;
        this.cantidad = cantidad;
        this.precioUnitarioCompra = precioUnitarioCompra;
    }
}

module.exports = DetalleOrden;