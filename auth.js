const jwt = require("jsonwebtoken");
const JWT_SECRET = "ujwalsecret";

function auth(req, res, next) {
    const token = req.headers.authorization;

    try {
        const response = jwt.verify(token, JWT_SECRET);

        if (!response) {
            res.status(403).json({
                message: "invalid credantials"
            })
        } else {
            req.userId = response.id;
            next();
        }
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}


