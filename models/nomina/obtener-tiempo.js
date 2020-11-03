class ObtenerTiempo{
    constructor({
        fechaRegistro,
        horaInicio,
        horaFin,
        idEmpleado,
        idNominaSueldo
    }){
        this.fechaRegistro = fechaRegistro;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.idEmpleado = idEmpleado;
        this.idNominaSueldo = idNominaSueldo;
    }
}

module.exports = ObtenerTiempo;
