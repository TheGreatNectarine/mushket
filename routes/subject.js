"use strict"
const express = require("express");
const router = express.Router();
const subjects = require('../db/subject-dao');

router.get(`/((\\d+))`, async function (req, res) {
    const subjID = +req.params[0];
    const subj = await subjects.getById(subjID);
    if (subj.data == null) {
        res.status(404).send();
    } else {
        const teachers = (await subjects.getTeachersBySubjectId(subjID));
        const reviews = (await subjects.getReviewsBySubjectId(subjID));
        res.send({
            ...subj.data,
            teachers: teachers.data,
            reviews: reviews.data
        });
    }
});


module.exports = router;
