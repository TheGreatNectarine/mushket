const pool = require('./db-pool');

module.exports = {
    getByAccID: async (acc_id) => {
        return pool.fetchOne("SELECT * FROM teacher WHERE acc_id = $1", [acc_id]);
	},
    getByID: async (id) => {
        return await pool.fetchOne("SELECT * FROM teacher WHERE id = $1", [id])
    },
}
