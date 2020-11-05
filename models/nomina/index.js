const NominaSueldos = require('./nomina-sueldos');
const ObtenerTiempo = require('./obtener-tiempo');

const register = ({ connection }) => {
    
    const insertNominaSueldos = async (nominaSueldos = new NominaSueldos()) => {
        const sqlQuery = `select ufn_insertar_nomina_sueldos(?, ?, ?, ?, ?, ?, ?) as idNominaSueldo`;

        return connection.query(sqlQuery, [ 
            nominaSueldos.cantidad, nominaSueldos.fechaPago, nominaSueldos.idEmpleado,
            nominaSueldos.idNumeroCuenta, nominaSueldos.saldoBruto, nominaSueldos.fechaNomina,
            nominaSueldos.idDescuento
        ]).then( (vq) => vq )
        .catch( (err) => { throw err; } );
    };

    const insertObtenerTiempos = async (obtenerTiempo = new ObtenerTiempo()) => {
        const sqlQuery = `insert into obtener_tiempo
        ( fecha_registro, hora_inicio, hora_fin, id_empleado,
        id_nomina_sueldos ) values (?, ?, ?, ?, ?)`;

        return connection.query(sqlQuery, [
            obtenerTiempo.fechaRegistro, obtenerTiempo.horaInicio,
            obtenerTiempo.horaFin, obtenerTiempo.idEmpleado, obtenerTiempo.idNominaSueldo
        ]).then( (vq) => vq )
        .catch( (err) => { throw err; } );
    };

    const findAllDescuentos = async () => {
        const sqlQuery = `select id, descripcion, valor_porcentaje from descuento`;

        return connection.query(sqlQuery).then( (vq) => vq )
        .catch( (err) => { throw err; } );
    };

    const findAllEfectivoCuentas = async () => {
        const sqlQuery = `select numero_cuenta, monto, descripcion from efectivo
            inner join cuenta_contable cc on efectivo.id_codigo_cuenta_contable = cc.codigo_cuenta`;

        return connection.query(sqlQuery).then( (vq) => vq )
        .catch( (err) => { throw err; } );
    };

    const findAllSalariosDescuento = async () => {
        const sqlQuery = `SELECT e.nombres, e.apellidos, e.tarifa_pago, d.valor_porcentaje, 
            e.tarifa_pago-(e.tarifa_pago*(d.valor_porcentaje)) AS 'SALDO NETO'
            FROM nomina_sueldos ns
            INNER JOIN descuento d ON ns.id_descuento = d.id
            INNER JOIN empleado e ON e.id = ns.id_empleado`;

        return connection.query(sqlQuery).then( (vq) => vq )
        .catch( (err) => { throw err; } );
    };

    return {
        findAllSalariosDescuento,
        insertNominaSueldos,
        insertObtenerTiempos,
        findAllDescuentos,
        findAllEfectivoCuentas
    };
};

module.exports = { register };
