const register = ({ connection }) => {
    
    const findAllGeneralLedger = async () => {
        const sqlQuery = `select fecha_pago, cantidad, 
            numero_cuenta, descripcion, debe, haber from view_libro_mayor`;

        return connection.query(sqlQuery)
            .then( (vq) => vq )
            .catch( (err) => { throw err; } );
    };

    return {
        findAllGeneralLedger
    };
};

module.exports = { register };