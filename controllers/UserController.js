const db = require('../db/connection');
const { hashPassword, comparePassword, generateToken } = require('../utils');

class UserController {
    /**
     * Funtion untuk register user
     */
    static async register(req, res) {
        try {
            /**
             * mengabil data email dan password yang user inputkan
             */
            let { email, password } = req.body;
            
            /**
             * cek apakah email atau password kosong
             */
            if (!email || !password) {
                
                return res.status(400).json({ message: "Email atau password tidak boleh kosong" });
            }

            /**
             * query untuk memasukkan data kedalam table users
             */
            const text = 'INSERT INTO "Users"(email, password) VALUES($1, $2) RETURNING *';
            const values = [email, hashPassword(password)];
            const data = await db.query(text, values);


            return res.status(201).json({
                id: data.rows[0].id,
                email: data.rows[0].email
            });
        } catch (error) {
            console.error(error.message);
            // cek apakah ada user yang memiki email yagnb sama
            const errmessage = error.message.includes("duplicate");
            if (errmessage) {
                return res.status(400).json({ message: "Email already used!" });
            }

            return res.status(500).json({error: 'Internal server error'});
        }
    }

    static async login(req, res) {
        try {
             /**
             * mengabil data email dan password yang user inputkan
             */
            let { email, password } = req.body;
             /**
             * cek apakah email atau password kosong
             */
            if (!email || !password) {
                return res.status(400).json({ message: "Email atau password tidak boleh kososng" });
            }

            
            /**
             * query untuk mencari data users yang memiliki email yang sesuai dengan email yang di input user
             */
            const text = 'select * from "Users" where email = $1';
            const values = [email];
            const data = await db.query(text, values);

            if (data.rows.length == 0) {
                return res.status(400).json({ message: "Email or password invalid!" });
            }
            // validasi apakah password yang di input user dan di databse sama 
            const isValid = comparePassword(password, data.rows[0].password)
            if (!isValid) {
                return res.status(400).json({ message: "Email or password invalid!!" });
            }

            // simpan data user ke variable user
            const user = data.rows[0]
            // buat token untuk user yang berhasil login
            const token = generateToken({
                id: user.id,
                email: user.email,
            })

            // set token ke header/cookie
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