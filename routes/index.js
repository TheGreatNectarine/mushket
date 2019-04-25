'use strict'
const express = require('express')
const router = express.Router()
const subjects = require('../db/subject-dao')
const students = require('../db/students-dao')

/* GET home page. */
router.get('/', async (req, res, next) => {
    const filterConfig = {
        "trymesters": ['1', '2', '2д', '3', '4', '4д', '5', '6', '6д', '7', '8'],
        "credits": {
            "min": 2,
            "max": 12,
            "step": 0.5
        },
        "types": ['Професійно-орієнтована', 'Нормативна', 'Вибіркова']
    }

    let filterArgs = req.query
    if (res.locals.user.role === 'student') {
        filterArgs['studentID'] = res.locals.user.model.id
    } else {
        delete filterArgs['studentID']
    }

    let results = []
    try {
        results = await subjects.getFilteredSubjects(req.query)
    } catch (e) {
        results = []
    }
    res.render('pages/index', {courses: results.data, filters: filterArgs, filterConfig: filterConfig})
})

module.exports = router
