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

    static async get(req, res) {
        const user = req.user;
        console.log(user)
        const { success, low_point, take_away } = req.body;

        try {
            const text = `SELECT * FROM "Reflections" WHERE "UserId" = $1`;
            const values = [user.id];
            const data = await db.query(text, values);
            console.log(data);
            res.status(201).json(data.rows[0]);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async edit(req, res) {
        const user = req.user;
        const id = req.query.id
        const { success, low_point, take_away } = req.body;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        try {
            let text = `UPDATE "Reflections"
            SET success = $1, "updatedAt"=$2, low_point=$3, take_away=$4
            WHERE id=$5;    `;
            let values = [success, formattedDate, low_point, take_away, id];
            let data = await db.query(text, values);

            text = `SELECT * FROM "Reflections" WHERE id = $1`;
            values = [id];
            data = await db.query(text, values);

            res.status(200).json(data.rows);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async delete(req, res) {
        const id = req.query.id
        console.log(id)

        try {
            const text = 'DELETE FROM "Reflections" WHERE id = $1';
            const values = [id];
            const result = await db.query(text, values);

            if (result.rowCount === 1) {
                res.status(200).json({
                    "message": "Success delete"
                });
            } else {
                res.status(404).json({ error: 'Record not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


module.exports = ReflectionsController;