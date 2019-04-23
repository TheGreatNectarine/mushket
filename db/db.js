const Pool = require("pg").Pool;
const pool = new Pool({
	user: "zhckvycszhbgeh",
	host: "ec2-54-195-252-243.eu-west-1.compute.amazonaws.com",
	database: "dmb0u10hi2uc4",
	password: "ef4e69d20ee11a1fc24a00adae701c4ac2cd16e13b8a29247ab3b145a339dae6",
	port: 5432,
	ssl: true
});

function getStudentById(req, res) {
	const id = req.params.id;
	pool.query("SELECT * FROM student WHERE id = $1", [id], (err, results) => {
		console.log("QUERY");
		if (err) {
			res.send({success: false, error: err});
			console.log("eror v debalo");
			throw err;
		}
		res.send({success: true, data: results});
	});
}

module.exports.getStudentByID = getStudentById;