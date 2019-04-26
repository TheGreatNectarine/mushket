const express = require('express')
const router = express.Router()
const subjects = require('../db/subject-dao')
const students = require('../db/students-dao')

router.get('/:id', async function (req, res, next) {
    const subjID = req.params.id
    const subj = await subjects.getById(subjID)
    if (subj.data == null) {
        res.status(404).send()
    } else {
        const teachers = (await subjects.getTeachersBySubjectId(subjID))
        const reviews = (await subjects.getReviewsBySubjectId(subjID))
        const canReview = res.locals.user.model ? await students.studentWithIDCanReviewSubjectWithID(res.locals.user.model.id, subjID) : false

        res.render('pages/course', {
            course: subj.data,
            teachers: teachers.data,
            reviews: reviews.data,
	        can_review: canReview
        })
    }
})

router.post('/:id', async function (req, res, next) {
    const subjID = req.params.id
    console.log(req.body)

    res.redirect(`/course/${subjID}`)
})

module.exports = router
