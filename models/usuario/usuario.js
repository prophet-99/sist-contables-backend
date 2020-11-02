class Usuario{
    constructor({
        idUsuario = 0,
        username,
        password,
        idCargo,
        idEmpleado
    }){
        this.idUsuario = idUsuario;
        this.username = username;
        this.password = password;
        this.idCargo = idCargo;
        this.idEmpleado = idEmpleado;
    }
}

module.exports = Usuario;