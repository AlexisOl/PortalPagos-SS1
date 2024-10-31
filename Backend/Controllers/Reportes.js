const pool = require('../Conexion/conexion');

// ya todo bien
const reporteUsuariosPorEstado = async (req, res) => {
    const query = `
        SELECT estadoUsuario.estado, COUNT(usuarios.id) AS cantidad_usuarios
        FROM usuarios
        JOIN estadoUsuario ON usuarios.id_tipo = estadoUsuario.id
        GROUP BY estadoUsuario.estado;
    `;
    const [results] = await pool.query(query);
    return res.status(200).json({
        results
    });
};

// ya jala
const reporteErroresTransacciones = async (req, res) => {
    const query = `
        SELECT transacciones.id, transacciones.fecha_transaccion, transacciones.descripcion_error
        FROM transacciones
        JOIN estadoTransacciones ON transacciones.id_estadoTransacciones = estadoTransacciones.id
        WHERE estadoTransacciones.tipo = 'fallida';
    `;
    const [results] = await pool.query(query);
    return res.status(200).json({
        results
    });
};



// ya todo bien
const reporteHistoricoMovimientosUsuario = async (req, res) => {
    const {
        idUsuario
    } = req.params;
    const query = `
        SELECT transacciones.fecha_transaccion, transacciones.monto, tipoMovimiento.tipo AS tipo_movimiento
        FROM transacciones
        JOIN cuentasElectronicas ON transacciones.id_cuentasElectronicas = cuentasElectronicas.id
        JOIN tipoMovimiento ON transacciones.id_tipoMovimiento = tipoMovimiento.id
        WHERE cuentasElectronicas.id_usuario = ?;
    `;
    const [results] = await pool.query(query, [idUsuario]);
    return res.status(200).json({
        results
    });
};


const reporteIngresosEgresos = async (req, res) => {
    const {
        fecha
    } = req.params;

    // Verificar si el parámetro fecha es null o undefined
    if (!fecha) {
        return res.status(400).json({
            error: "La fecha es requerida"
        });
    }

    const query = `
        SELECT tipoMovimiento.tipo AS tipo_movimiento, SUM(transacciones.monto) AS monto_total
        FROM transacciones
        JOIN tipoMovimiento ON transacciones.id_tipoMovimiento = tipoMovimiento.id
        WHERE DATE(transacciones.fecha_transaccion) <= ?
        GROUP BY tipoMovimiento.tipo;
    `;

    try {
        const [results] = await pool.query(query, [fecha]);
        return res.status(200).json({
            results
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Error al obtener el reporte de ingresos/egresos"
        });
    }
};


const reporteGananciasGenerales = async (req, res) => {
    const {
        fecha
    } = req.params;

    // Verificar si el parámetro fecha es null o undefined
    if (!fecha) {
        return res.status(400).json({
            error: "La fecha es requerida"
        });
    }

    const query = `
        SELECT SUM(transacciones.monto) AS monto_total
        FROM transacciones
        WHERE DATE(transacciones.fecha_transaccion) <= ?;
    `;

    try {
        const [results] = await pool.query(query, [fecha]);
        return res.status(200).json({
            results
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Error al obtener el reporte de ganancias generales"
        });
    }
};


module.exports = {
    reporteUsuariosPorEstado,
    reporteErroresTransacciones,
    reporteHistoricoMovimientosUsuario,
    reporteIngresosEgresos,
    reporteGananciasGenerales
}