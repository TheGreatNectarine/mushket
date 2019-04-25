const pool = require('./db-pool');

module.exports = {
	getByID: async (id) => {
		return await pool.fetchOne("SELECT * FROM student WHERE id = $1", [id]);
	},
	getByAccID: async (acc_id) => {
		return await pool.fetchOne("SELECT * FROM student WHERE acc_id = $1", [acc_id]);
	},
	getStudentsSpecializationByID: async(id) => {
		return await pool.fetchOne(`SELECT * FROM specialization 
		WHERE id = 	(SELECT specialization_id FROM student
					WHERE student.id = ${id});`);
	}

};