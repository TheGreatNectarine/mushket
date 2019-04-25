"use strict"
const express = require("express");
const router = express.Router();

router.get(`/((\\d+))`, function(req, res) {
    const subjID = +req.params[0];
    
    res.send('!');
});


module.exports = router;