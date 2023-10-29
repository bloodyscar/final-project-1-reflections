const db = require('../db/connection');
const { hashPassword, comparePassword, generateToken } = require('../utils');

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

            return res.status(500).json({error: 'Internal server error'});
        }
    }

    static async login(req, res) {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email atau password tidak boleh kososng" });
            }
            const text = 'select * from "Users" where email = $1';
            const values = [email];
            const data = await db.query(text, values);

            if (data.rows.length == 0) {
                return res.status(400).json({ message: "Email or password invalid!" });
            }
            const isValid = comparePassword(password, data.rows[0].password)
            if (!isValid) {
                return res.status(400).json({ message: "Email or password invalid!!" });
            }

            const user = data.rows[0]
            const token = generateToken({
                id: user.id,
                email: user.email,
            })
            // token header
            res.header('Authorization', 'Bearer ' + token);
            // token di cookies
            // res.cookie('Authorization', 'Bearer '+ token);
            return res.status(200).json({
                access_token: token
            });


        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error: "Internal Server error"});
        }
    }
}

module.exports = UserController;