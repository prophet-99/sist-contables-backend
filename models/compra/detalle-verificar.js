class DetalleDisponibilidad {
    constructor({
        idNumeroItem,
        idVerificarDisponibilidad,
        descripcion,
        reorden,
        cantidadSolicitada

    }) {
        this.idNumeroItem = idNumeroItem;
        this.idVerificarDisponibilidad = idVerificarDisponibilidad;
        this.descripcion = descripcion;
        this.reorden = reorden;
        this.cantidadSolicitada = cantidadSolicitada;
    }
}

module.exports = DetalleDisponibilidad;