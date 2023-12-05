const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Token missing or invalid", success: false });
        }

        const tokenValue = token.split(" ")[1];

        jwt.verify(tokenValue, process.env.JWT_SECRET_ADMIN, async (err, decoded) => {
            if (err || decoded.role !== "ADMIN") {
                console.log('3');
                return res.status(401).json({ message: "Authentication failed", success: false });
            }

            // for more security is there a admin IN DATABASE with the decoded id from tokrn
            const user = await userModel.findOne({ _id: decoded.id })
            const admin = user.admin
            if (!user || !admin) {
                return res.status(401).json({ message: "No such admin in database", success: false });
            }

            req.body.userId = decoded.id;
            next();

        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error", success: false });
    }
};
