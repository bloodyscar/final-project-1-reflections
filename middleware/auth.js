const { veriifyToken } = require("../utils");

async function auth(req, res, next) {
    try {
        // token di header
        const token = req.headers.authorization;
        // token di cookies
        // const token = req.cookies.Authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // const user = veriifyToken(token.slice(7));
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