const db = require('../db/connection');

class ReflectionsController {
    static async create(req, res) {
        const user = req.user;
        const { success, low_point, take_away } = req.body;

        try {
            const text = 'INSERT INTO "Reflections"(success, low_point, take_away, "UserId") VALUES($1, $2, $3, $4) RETURNING *';
            const values = [success, low_point, take_away, user.id];
            const data = await db.query(text, values);
            console.log(data);
            res.status(201).json(data.rows[0]);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}


module.exports = ReflectionsController;