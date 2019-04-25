"use strict";
const pool = require("./db-pool");

const getFilteredSubjects = async (keywords) => {
	let query = `
		SELECT *
		FROM subject s
		WHERE TRUE
	`;
	const faculty = keywords["faculty"];
	const specialization = keywords["specialization"];
	const subject_type = keywords["subject_type"];
	const credits = keywords["credits"];
	const trimester = keywords["trimester"];
	const tags = keywords["tags"];
	let queryArguments = [];
	let argumentIndex = 1;
	if (faculty) {
		queryArguments.push(faculty);
		query += `AND s.id IN (SELECT ss.subject_id
											FROM specialization_subject ss
											WHERE ss.specialization_id IN (SELECT sp.id
																			FROM specialization sp
																			WHERE sp.faculty_id IN (SELECT f.id
																									FROM faculty f
																									WHERE f.name = $${argumentIndex}))) `;
		argumentIndex += 1;
	}
	if (specialization) {
		queryArguments.push(specialization);
		query += `AND s.id IN (SELECT ss.subject_id
											FROM specialization_subject ss
											WHERE ss.specialization_id IN (SELECT sp.id
																			FROM specialization sp
																			WHERE sp.name = $${argumentIndex})) `;
		argumentIndex += 1;
	}
	if (subject_type) {
		queryArguments.push(subject_type);
		query += `AND s.id IN (SELECT ss.subject_id
											FROM specialization_subject ss
											WHERE subject_category = $${argumentIndex}) `;
		argumentIndex += 1;
	}
	if (credits) {
		queryArguments.push(credits);
		query += `AND s.number_of_credits = $${argumentIndex} `;
		argumentIndex += 1;
	}
	if (trimester) {
		queryArguments.push(trimester);
		query += `AND s.trimester = $${argumentIndex} `;
		argumentIndex += 1;
	}
	if (tags) {
		for (const tag of tags) {
			queryArguments.push(tag);
			query += `AND s.id IN (SELECT st.subject_id
												FROM subject_tag st
												WHERE st.tag_id IN (SELECT t.id
																	FROM tag t
																	WHERE t.name = $${argumentIndex})) `;
			argumentIndex += 1;
		}
	}
	return await pool.fetchMany(query, queryArguments);
};

const getSubjectsByStudentIDAndSubjectType = async (id, type) => {
	const query = `
		SELECT *
		FROM subject s
		WHERE s.id IN (SELECT ss.subject_id
						FROM student_subject ss
						WHERE ss.student_id = $ 1)
		AND s.id IN (SELECT sp_s.subject_id
						FROM specialization_subject sp_s
						WHERE subject_category = $ 2)
	`;
	return await pool.fetchMany(query, [id, type]);
};

module.exports = {
	getFilteredSubjects: getFilteredSubjects,
	getSubjectsByStudentIDAndSubjectType: getSubjectsByStudentIDAndSubjectType
};

