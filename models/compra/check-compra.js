class CheckCompra {
    constructor({
        numeroOrden,
        descripcion,
        fechaPedido,
        fechaEsperada,
        precioTotalEsperado,
        idProveedor,
        idEmpleado,
        idVerificarDisponibilidad
    }) {
        this.numeroOrden = numeroOrden;
        this.descripcion = descripcion;
        this.fechaPedido = fechaPedido;
        this.fechaEsperada = fechaEsperada;
        this.precioTotalEsperado = precioTotalEsperado;
        this.idProveedor = idProveedor;
        this.idEmpleado = idEmpleado;
        this.idVerificarDisponibilidad = idVerificarDisponibilidad; // MARICIELO CTV :)
    }
}

module.exports = CheckCompra;