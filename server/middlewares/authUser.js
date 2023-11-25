const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        // this is set for accessing HOME page without a user,
        if (token === 'Bearer null') {
            return res.status(200).send({message: "Home Page Without a Logged User", success: true});
        }

        if (! token || ! token.startsWith("Bearer ")) {
            return res.status(401).send({message: "Token missing or invalid", success: false});
        }

        const tokenValue = token.split(" ")[1];

        jwt.verify(tokenValue, process.env.JWT_SECRET_USER, async (err, decoded) => {
            if (err || decoded.role !== "USER") {
                return res.status(401).json({message: "Authentication failed", success: false});
            }

            // for more security is there a user IN DATABASE with the decoded id from token
            const user = await userModel.findOne({_id:decoded.id})   
            const verified = user.email_verification
            if(!user || !verified){
                return res.status(401).json({message: "No such verified user in database", success: false});
            }

            req.body.userId = decoded.id;
            next();

        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: "Internal server error", success: false});
    }
};
