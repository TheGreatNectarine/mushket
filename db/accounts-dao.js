const pool = require('./db-pool');
const md5 = require('md5');

module.exports = {
    accId: async (login, pwd) => {
        const hashedpwd = md5(pwd);
        const client = await pool.connect();
		try {
            const result = await client.query(
                `SELECT acc_id 
                FROM account 
                WHERE login = '${login}' AND pwd = '${hashedpwd}'`);
			return {success: true, data: result.rowCount !== 0 ? result.rows[0].acc_id : null};
		} catch (e) {
			return {success: false, err: e};
		}
    }
}