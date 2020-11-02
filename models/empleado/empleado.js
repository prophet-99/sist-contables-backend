class Empleado{
    constructor({
        id = 0,
        dni,
        fechaNacimiento, 
        fechaContratacion, 
        nombres, 
        apellidos,
        tarifaPago, 
        email, 
        idCargo,
        idUsuario
    }){
        this.id = id;
        this.dni = dni;
        this.fechaContratacion = fechaContratacion;
        this.fechaNacimiento = fechaNacimiento
        this.nombres = nombres; 
        this.apellidos = apellidos;
        this.tarifaPago = tarifaPago; 
        this.email = email; 
        this.idCargo = idCargo;
        this.idUsuario = idUsuario;   
    }
};

module.exports = Empleado;

