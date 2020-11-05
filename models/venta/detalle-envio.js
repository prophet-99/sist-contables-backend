class DetalleEnvio {
    constructor({
        idEntregarProducto,
        idNumeroItem,
        cantidadEnviada,
        estadoEnvio,
        observacion

    }) {
        this.idEntregarProducto = idEntregarProducto;
        this.idNumeroItem = idNumeroItem;
        this.cantidadEnviada = cantidadEnviada;
        this.estadoEnvio = estadoEnvio;
        this.observacion = observacion;
    }
}

module.exports = DetalleEnvio;