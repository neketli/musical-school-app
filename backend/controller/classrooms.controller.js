const db = require('../db')

class ClassroomsController {
	async createClassrooms (req, res) {
		const { type, number, id_departament } = req.body
		const newClassrooms = await db.query(
			`INSERT INTO classrooms (type, number, id_departament) VALUES ($1, $2, $3) RETURNING *`,
			[ type, number, id_departament ],
		)

		res.json(newClassrooms.rows[0])
	}
	async getClassrooms (req, res) {
		const { id } = req.params
		const classrooms = await db.query(
			'SELECT * FROM classrooms WHERE id = $1',
			[ id ],
		)

		res.json(classrooms.rows[0])
	}
	async getAllClassrooms (req, res) {
		const classrooms = await db.query('SELECT * FROM classrooms')

		res.json(classrooms.rows)
	}
	async updateClassrooms (req, res) {
		const { id } = req.params
		const { type, number, id_departament } = req.body
		const departament = await db.query(
			'UPDATE classrooms SET type = $2, number = $3, id_departament = $4 WHERE id = $1 RETURNING *',
			[ id, type, number, id_departament ],
		)

		res.json(departament.rows[0])
	}
	async deleteClassrooms (req, res) {
		const { id } = req.params
		await db.query('DELETE FROM classrooms WHERE id = $1', [
			id,
		])

		res.json('ok')
	}
}

module.exports = new ClassroomsController()
