const pool = require('./db-pool');

module.exports = {
    getByAccID: async (acc_id) => {
		const client = await pool.connect();
		try {
            const result = await client.query("SELECT * FROM teachers WHERE acc_id = $1", [acc_id]);
            client.release();            
			return {success: true, data: result.rowCount !== 0 ? result.rows[0] : null};
		} catch (e) {
            client.release();
			return {success: false, err: e};
		}
	} 
}