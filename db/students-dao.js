const pool = require('./db-pool');

module.exports = {
	getByID: async (id) => {
		const client = await pool.connect();
		try {
			const result = await client.query("SELECT * FROM student WHERE id = $1", [id]);
			return {success: true, data: result ? result.rows : []};
		} catch (e) {
			return {success: false, err: e};
		}
	},

};