"use strict"
const pool = require("./db-pool")

module.exports = {
	getAllFaculties: async () => {
		return await pool.fetchMany("SELECT * FROM faculty")
	}
}