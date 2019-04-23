const Pool = require("pg").Pool;
const pool = new Pool({
	user: "zhckvycszhbgeh",
	host: "ec2-54-195-252-243.eu-west-1.compute.amazonaws.com",
	database: "dmb0u10hi2uc4",
	password: "ef4e69d20ee11a1fc24a00adae701c4ac2cd16e13b8a29247ab3b145a339dae6",
	port: 5432,
	ssl: true
});

const students = {
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

module.exports.students = students;