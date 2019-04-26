"use strict"
const pool = require("./db-pool")

const getFilteredSubjects = async (keywords) => {
	let query = `
      SELECT *
      FROM subject s
      WHERE TRUE
	`
	const faculty = keywords["faculty"]
	const subject_type = keywords["subject_type"]
	const studentID = keywords["studentID"]
	const credits = keywords["credits"]
	const trimester = keywords["trimester"]
	const tags = keywords["tags"]
	let queryArguments = []
	let argumentIndex = 1
	if (faculty) {
		queryArguments.push(faculty)
		query += `AND s.id IN (SELECT ss.subject_id
											FROM specialization_subject ss
											WHERE ss.specialization_id IN (SELECT sp.id
																			FROM specialization sp
																			WHERE sp.faculty_id IN (SELECT f.id
																									FROM faculty f
																									WHERE f.name = $${argumentIndex}))) `
		argumentIndex += 1
	}
	if (subject_type && studentID) { // TODO NEED REVIEW
		if (subject_type === "Вибіркова") {
			query += `AND s.id IN (SELECT s1.id
                                   FROM subject s1
                                   EXCEPT
                                   SELECT sp_s.subject_id
                                   FROM specialization_subject sp_s
                                   WHERE (sp_s.subject_category = 'Нормативна'
                                     OR sp_s.subject_category = 'Професійно-орієнтована')
                                     AND sp_s.specialization_id IN (SELECT st.specialization_id
                                                                    FROM student st
                                                                    WHERE st.id = $${argumentIndex})) `
		} else {
			query += `AND s.id IN (SELECT sp_s.subject_id
					               FROM specialization_subject sp_s
					               WHERE sp_s.subject_category = '${subject_type}'
		                           AND sp_s.specialization_id IN (SELECT st.specialization_id
		                                                          FROM student st
		                                                          WHERE st.id = $${argumentIndex})) `
		}

		queryArguments.push(studentID)

		argumentIndex += 1
	}
	if (credits) {
		queryArguments.push(credits)
		query += `AND s.number_of_credits < $${argumentIndex} `
		argumentIndex += 1
	}
	if (trimester) {
		queryArguments.push(trimester)
		query += `AND s.trimester = $${argumentIndex} `
		argumentIndex += 1
	}
	if (tags) {
		for (const tag of tags) {
			queryArguments.push(tag)
			query += `AND s.id IN (SELECT st.subject_id
												FROM subject_tag st
												WHERE st.tag_id IN (SELECT t.id
																	FROM tag t
																	WHERE t.name = $${argumentIndex})) `
			argumentIndex += 1
		}
	}
	return await pool.fetchMany(query, queryArguments)
}

/*
const getSubjectsByStudentIDAndSubjectType = async (id, type) => {
	const query = `
      SELECT *
      FROM subject s
      WHERE s.id IN (SELECT sp_s.subject_id
                     FROM specialization_subject sp_s
                     WHERE subject_category = $2
        AND sp_s.specialization_id IN (
      SELECT st.specialization_id
      FROM student
           st
      WHERE st.id = $ 1
      )
      )
	`;
	return await pool.fetchMany(query, [id, type]);
};
*/

const getReviewsBySubjectId = async (id) => {
	const query = `
	(
		SELECT review_text, title as review_title, review_mark, submit_date, teacher.full_name, teacher.photo_link, 'teacher' as review_role
		FROM (review INNER JOIN teacher ON review.teacher_id = teacher.id)
		WHERE review.subject_id = ${id}
			UNION
		SELECT review_text, title as review_title, review_mark, submit_date, student.full_name, student.photo_link, 'student' as review_role
		FROM (review INNER JOIN student ON review.student_id = student.id)
		WHERE review.subject_id = ${id}
	)
		ORDER BY submit_date;`
	return pool.fetchMany(query)
}

const getById = async (id) => {
	const query = `
		SELECT *
		FROM subject
		WHERE id = ${id}
	`
	return pool.fetchOne(query)
}

const getTeachersBySubjectId = async (id) => {
	const query = `SELECT *
					FROM teacher
					WHERE id IN (SELECT teacher_id
								FROM teacher_subject
								WHERE subject_id = ${id});`
	return pool.fetchMany(query)
}

const createSubject = async (keywords) => {
	const subject_name = keywords["subject_name"]
	const number_of_credits = keywords["number_of_credits"]
	const max_number_of_students = keywords["max_number_of_students"]
	const unlimited_students = keywords["unlimited_students"]
	const rating = null
	const trimester = keywords["trimester"]
	const is_for_bachelor = keywords["is_for_bachelor"]
	const description = keywords["description"]
	const photo_url = keywords["photo_url"]
	if (subject_name == null || number_of_credits == null || trimester == null || is_for_bachelor == null || description == null) {
		console.log("TRIED TO INSERT NULL IN NOT NULL")
	}
	const query = "INSERT INTO subject(subject_name, number_of_credits, max_number_of_students, unlimited_students, rating, trimester, is_for_bachelor, description, photo_url) " +
		" VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
	console.log([subject_name, number_of_credits, max_number_of_students, unlimited_students,
		rating, trimester, is_for_bachelor, description, photo_url])
	return await pool.execute(query, [subject_name, number_of_credits, max_number_of_students, unlimited_students,
		rating, trimester, is_for_bachelor, description, photo_url])
}


const addReview = async (pers_id, pers_role, subj_id, title, text, mark) => {
	const query = `
		INSERT INTO review(subject_id, ${pers_role === 'student' ? 'student_id' : 'teacher_id'}, 
							review_text, review_mark, submit_date, title)
		VALUES ($1, $2, $3, $4, date($5), $6)`;
	const params = [subj_id, pers_id, text, mark, new Date(), title];
	return await pool.execute(query, params);
}


const getSubjectsForIndex = async () => {
	const query = `
      SELECT s.id, s.subject_name as title, s.description, s.rating, s.photo_url
      FROM subject s
	`
	return await pool.fetchMany(query)
}

module.exports = {
	getFilteredSubjects: getFilteredSubjects,
	getReviewsBySubjectId: getReviewsBySubjectId,
	getById: getById,
	getTeachersBySubjectId: getTeachersBySubjectId,
	createSubject: createSubject,
	addReview: addReview
	getSubjectsForIndex: getSubjectsForIndex
	// getSubjectsByStudentIDAndSubjectType: getSubjectsByStudentIDAndSubjectType
}

