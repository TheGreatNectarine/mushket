"use strict";
const pool = require("./db-pool")

module.exports = {
	getAllTags: async () => await pool.fetchMany("SELECT * FROM tag")
}