const Pool = require("pg").Pool;
const pool = new Pool({
	user: "zhckvycszhbgeh",
	host: "ec2-54-195-252-243.eu-west-1.compute.amazonaws.com",
	database: "dmb0u10hi2uc4",
	password: "ef4e69d20ee11a1fc24a00adae701c4ac2cd16e13b8a29247ab3b145a339dae6",
	port: 5432,
	ssl: true
});

module.exports.fetchOne = async (query, params=[]) => {
	try {
		const client = await pool.connect();
		const result = await client.query(query, params);
		return {success: true, data: result.rowCount !== 0 ? result.rows[0] : null};
	} catch (e) {
		return {success: false, err: e};
	} finally {
		client.release();
	}
}

module.exports.fetchMany = async (query, params=[]) => {
	try {
		const client = await pool.connect();
		const result = await client.query(query, params);
		return {success: true, data: result != null ? result.rows : []};
	} catch (e) {
		return {success: false, err: e};
	} finally {
		client.release();
	}
}

module.exports.fetchScalar = async (query, params=[], attribute) => {
	return (await module.exports.fetchOne(query, params)[attribute]);
}
