class Cliente{
    constructor({
        id,
        dni,
        nombre,
        direccion,
        celular,
        numeroCuenta,
        creditoDisponible,
        creditoAsignado
    }){
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.direccion = direccion;
        this.celular = celular;
        this.numeroCuenta = numeroCuenta;
        this.creditoDisponible = creditoDisponible;
        this.creditoAsignado = creditoAsignado;
    };
}

module.exports = Cliente;