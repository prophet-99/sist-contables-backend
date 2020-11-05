class AddRecomendacion {
    constructor({

        numeroRecomendacion,
        descripcion,
        idVerificarDisponibilidad,
        idNumeroCliente,
        idNumeroItem
    }) {
        this.numeroRecomendacion = numeroRecomendacion;
        this.descripcion = descripcion;
        this.idVerificarDisponibilidad = idVerificarDisponibilidad;
        this.idNumeroCliente = idNumeroCliente;
        this.idNumeroItem = idNumeroItem;

    }
}

module.exports = AddRecomendacion;