var pool = require('./bd');

/* ALISTAR */
async function getNovedades() {
    var query = 'SELECT * FROM `novedades`';
    var rows = await pool.query(query);
    return rows;
}

/* INSERTAR */
async function insertNovedad(obj) {
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj])
        return rows;

    } catch(error) {
        console.log(error);
        throw error
    }
}

/* ELIMINAR */
async function deleteNovedadId(id) {
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

/* EDITAR */
async function getNovedadId(id) {
    var query = 'select * from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function editarNovedadId(obj, id) {
    try {
        var query = "update novedades set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getNovedades, insertNovedad, deleteNovedadId, getNovedadId, editarNovedadId }
