"use strict";
const pool = require("./db-pool");

module.exports = {
	getFilteredSubjects: async (keywords) => {
		const client = await pool.connect();
		try {
			let where_clause = "WHERE TRUE ";
			const faculty = keywords["faculty"];
			const specialization = keywords["specialization"];
			const subject_type = keywords["subject_type"];
			const credits = keywords["credits"];
			const trimester = keywords["trimester"];
			const tags = keywords["tags"];
			const args = []
				.concat
				.apply([], [faculty, specialization, subject_type, credits, trimester, tags]
					.filter(x => x)); // filtering from undefined and making flat
			let arg_ind = 1;
			if (faculty) {
				where_clause += `AND s.id IN (SELECT ss.subject_id
				                              FROM specialization_subject ss
				                              WHERE ss.specialization_id IN (SELECT sp.id
				                                                             FROM specialization sp
				                                                             WHERE sp.faculty_id IN (SELECT f.id
				                                                                                  FROM faculty f
				                                                                                  WHERE f.name = $${arg_ind}))) `;
				arg_ind += 1;
			}
			if (specialization) {
				where_clause += `AND s.id IN (SELECT ss.subject_id
				                              FROM specialization_subject ss
				                              WHERE ss.specialization_id IN (SELECT sp.id
				                                                             FROM specialization sp
				                                                             WHERE sp.name = $${arg_ind})) `;
				arg_ind += 1;
			}
			if (subject_type) {
				where_clause += `AND s.id IN (SELECT ss.subject_id
				                              FROM specialization_subject ss
				                              WHERE subject_category = $${arg_ind}) `;
				arg_ind += 1;
			}
			if (credits) {
				where_clause += `AND s.number_of_credits = $${arg_ind} `;
				arg_ind += 1;
			}
			if (trimester) {
				where_clause += `AND s.trimester = $${arg_ind} `;
				arg_ind += 1;
			}
			if (tags) {
				for (const _ of tags) {
					where_clause += `AND s.id IN (SELECT st.subject_id
					                              FROM subject_tag st
					                              WHERE st.tag_id IN (SELECT t.id
					                                                  FROM tag t
					                                                  WHERE t.name = $${arg_ind})) `;
					arg_ind += 1;
				}
			}

			const query = `SELECT *
            FROM subject s 
            ${where_clause}`;
			console.log(query, args);
			const results = await client.query(query, args);
			return {success: true, data: results ? results.rows : []};
		} catch (e) {
			return {success: false, err: e};
		}
	}
};

