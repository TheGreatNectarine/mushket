const pool = require('./db-pool');

module.exports = {
    getByAccID: async (acc_id) => {
        return pool.fetchOne("SELECT * FROM teacher WHERE acc_id = $1", [acc_id]);
	},
    getByID: async (id) => {
        return await pool.fetchOne("SELECT * FROM teacher WHERE id = $1", [id])
    },
    getSubjectsByTeacherID: async (id) => {
        const query = `
        SELECT *
        FROM subject sub
        WHERE sub.id IN (SELECT DISTINCT s.id
                         FROM teacher t 
                         INNER JOIN teacher_subject ts on t.id = ts.teacher_id
                         INNER JOIN subject s on ts.subject_id = s.id
                         WHERE t.id = $1)
        `
        const args = [id]
        return await pool.fetchMany(query, args)
    },
}
