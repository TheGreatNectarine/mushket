const pool = require('./db-pool');

module.exports = {
    getByAccID: async (acc_id) => {
        return pool.fetchOne("SELECT * FROM teachers WHERE acc_id = $1", [acc_id]);
	} 
}