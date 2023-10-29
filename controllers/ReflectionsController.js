const db = require('../db/connection');
const { format } = require('../utils');

class ReflectionsController {
    static async create(req, res) {
        const user = req.user;
        const { success, low_point, take_away } = req.body;

        try {
            const text = 'INSERT INTO "Reflections"(success, low_point, take_away, "UserId") VALUES($1, $2, $3, $4) RETURNING *';
            const values = [success, low_point, take_away, user.id];
            let data = (await db.query(text, values)).rows[0];
            data.createdAt = format(data.createdAt)
            data.updatedAt = format(data.updatedAt)
            res.status(201).json(data);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async get(req, res) {
        const user = req.user;

        try {
            const text = `SELECT * FROM "Reflections" WHERE "UserId" = $1`;
            const values = [user.id];
            const data = await db.query(text, values);
            res.status(200).json(data.rows);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async edit(req, res) {
        // const user = req.user;
        // const id = req.query.id
        const id = req.params.id;
        // console.log(id);
        const { success, low_point, take_away } = req.body;
        const currentDate = new Date();

        try {
            let text = `UPDATE "Reflections"
            SET success = $1, "updatedAt" = $2, low_point=$3, take_away=$4
            WHERE id=$5;`;
            let values = [success, currentDate, low_point, take_away, id];
            let data = await db.query(text, values);

            if (data.rowCount === 0) {
                throw {
                    code: 400,
                    message: `Reflections dengan id ${id} Tidak ditemukan`
                }
            }

            text = `SELECT * FROM "Reflections" WHERE id = $1`;
            values = [id];
            data = (await db.query(text, values)).rows[0];
            data.createdAt = format(data.createdAt)
            data.updatedAt = format(data.updatedAt)
            res.status(200).json(data);
        } catch (error) {
            console.log(error.message);
            if (error.code) {
                return res.status(error.code).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async delete(req, res) {
        // const id = req.query.id;
        const id = req.params.id;
        // console.log(id);

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