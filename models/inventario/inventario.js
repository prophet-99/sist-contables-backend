class Inventario{ 
    constructor({
        numeroItem,
        descripcion,
        ubicacion,
        cantidadDiponible,
        puntoReorden,
        costoUnitario,
        tasaUso,
        idCategoria
    }){
        this.numeroItem = numeroItem;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.cantidadDiponible = cantidadDiponible;
        this.puntoReorden = puntoReorden;
        this.costoUnitario = costoUnitario;
        this.tasaUso = tasaUso;
        this.idCategoria = idCategoria;
    }   
}

module.exports = Inventario;