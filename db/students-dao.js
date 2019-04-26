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
	},
	getSubjectsByStudentID: async (id) => {
		const query = `
          SELECT *
          FROM subject sub
          WHERE sub.id IN (SELECT s.id
                           FROM student st
                                  INNER JOIN student_subject ss on st.id = ss.student_id
                                  INNER JOIN subject s on ss.subject_id = s.id
                           WHERE st.id = $1)
		`
		const args = [id]
		return await pool.fetchMany(query, args)
	},
	addTag: async (student_id, tag_id) => {
		const query = `
		INSERT INTO student_tag(student_id, tag_id) 
		VALUES ($1, $2)
		`
		const args = [student_id, tag_id]
		return await pool.fetchOne(query, args)
	},
	removeAllTags: async (id) => {
		const query = `
		DELETE FROM student_tag
		WHERE student_id = $1
		`
		const args = [id]
		return await pool.fetchOne(query, args)
	},
}
