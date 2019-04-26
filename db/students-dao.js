const pool = require("./db-pool")

module.exports = {
	getByID: async (id) => {
		return await pool.fetchOne("SELECT * FROM student WHERE id = $1", [id])
	},
	getByAccID: async (acc_id) => {
		return await pool.fetchOne("SELECT * FROM student WHERE acc_id = $1", [acc_id])
	},
	getStudentsSpecializationByID: async (id) => {
		return await pool.fetchOne(`SELECT * FROM specialization 
		WHERE id = 	(SELECT specialization_id FROM student
					WHERE student.id = ${id});`)
	},
	studentWithIDCanReviewSubjectWithID: async (studentID, subjectID) => {
		const result = await pool.fetchOne(`
          SELECT EXISTS(SELECT *
                        FROM student_subject ss
                        WHERE ss.student_id = $1
                          AND ss.subject_id = $2)
		`, [studentID, subjectID])
		if (result.data && result.data.exists) {
			return result.data.exists
		} else {
			return false
		}
	}
}