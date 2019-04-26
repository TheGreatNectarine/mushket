const pool = require("./db-pool");
const md5 = require("md5");

module.exports = {
	accId: async (login, pwd) => {
		const hashedpwd = md5(pwd);
		const query = `SELECT acc_id 
                FROM account 
                WHERE login = '${login}' AND pwd = '${hashedpwd}'`;
		return await pool.fetchScalar(query, "acc_id");
    },
    accIdOffice: async (email) => {
		const query = `SELECT acc_id 
                FROM account 
                WHERE office_id = '${email}'`;
		return await pool.fetchScalar(query, "acc_id");
	}
};