const { veriifyToken } = require("../utils");

async function auth(req, res, next) {
    try {

        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const user = veriifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        if (error.message.includes('invalid')) {
            return res.status(400).json("Token Tidak Valid");
        }
        console.log(error.message);
        return res.status(500).json("Internal Server error");
    }
}

module.exports = auth;