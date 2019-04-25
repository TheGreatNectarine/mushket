const express = require('express')
const router = express.Router()
const subjects = require('../db/subject-dao')

router.get('/:id', async function (req, res, next) {
    const subjID = req.params.id
    const subj = await subjects.getById(subjID)
    if (subj.data == null) {
        res.status(404).send()
    } else {
        const teachers = (await subjects.getTeachersBySubjectId(subjID))
        const reviews = (await subjects.getReviewsBySubjectId(subjID))
        res.render('pages/course', {
            course: subj.data,
            teachers: teachers.data,
            reviews: reviews.data,
        })
    }
})

module.exports = router
