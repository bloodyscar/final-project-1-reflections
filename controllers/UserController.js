const db = require('../db/connection');
const { hashPassword } = require('../utils');

class UserController {
    static async register(req, res) {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email atau password tidak boleh kososng" });
            }
            const text = 'INSERT INTO "Users"(email, password) VALUES($1, $2) RETURNING *';
            const values = [email, hashPassword(password)];
            const data = await db.query(text, values);
            return res.status(201).json({
                id: data.rows[0].id,
                email: data.rows[0].email
            });
        } catch (error) {
            console.error(error.message);
            const errmessage = error.message.includes("duplicate");
            if (errmessage) {
                return res.status(400).json({ message: "Email already used!" });
            }

            return res.status(500).json('Internal server error');
        }
    }
}

module.exports = UserController;