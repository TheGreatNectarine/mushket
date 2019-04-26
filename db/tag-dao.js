"use strict"
const pool = require("./db-pool")

module.exports = {
	getAllTags: async () => await pool.fetchMany("SELECT * FROM tag"),
	getSelectedTags: async (id) => {
		const query = `
          SELECT t.id,
                 t.name,
                 (EXISTS(SELECT * FROM student_tag st WHERE st.student_id = s.id AND st.tag_id = t.id)) AS SELECTED
          FROM tag t,
               student s
		  WHERE s.id = $1
		`
		const args = [id]
		return await pool.fetchMany(query, args)
	}
}