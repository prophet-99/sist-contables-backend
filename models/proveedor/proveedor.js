class Proveedor{
    constructor({
        id,
        nombre,
        direccion,
        ruc,
        numeroCuenta,
        numeroEnviosFallados,
        numeroEnviosIncompletos,
        observacionesComerciales,
        idPlazoEntrega
    }){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.ruc = ruc;
        this.numeroCuenta = numeroCuenta;
        this.numeroEnviosFallados = numeroEnviosFallados;
        this.numeroEnviosIncompletos = numeroEnviosIncompletos;
        this.observacionesComerciales = observacionesComerciales;
        this.idPlazoEntrega = idPlazoEntrega;
    }
}

module.exports = Proveedor;