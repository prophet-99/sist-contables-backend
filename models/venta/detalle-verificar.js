class DetalleDisponibilidad {
    constructor({
        idNumeroItem,
        idVerificarDisponibilidad,
        descripcion,
        cantidadSolicitada

    }) {
        this.idNumeroItem = idNumeroItem;
        this.idVerificarDisponibilidad = idVerificarDisponibilidad;
        this.descripcion = descripcion;
        this.cantidadSolicitada = cantidadSolicitada;
    }
}

module.exports = DetalleDisponibilidad;