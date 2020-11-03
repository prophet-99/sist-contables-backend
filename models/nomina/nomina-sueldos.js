class NominaSueldos{
    constructor({
        cantidad,
        fechaPago,
        idEmpleado,
        idNumeroCuenta,
        saldoBruto,
        fechaNomina,
        idDescuento
    }){
        this.cantidad = cantidad;
        this.fechaPago = fechaPago;
        this.idEmpleado = idEmpleado;
        this.idNumeroCuenta = idNumeroCuenta;
        this.saldoBruto = saldoBruto;
        this.fechaNomina = fechaNomina;
        this.idDescuento = idDescuento;
    };
}

module.exports = NominaSueldos;