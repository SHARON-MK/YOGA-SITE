const jwt = require("jsonwebtoken");
const trainerModel = require('../models/trainerModel')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (! token || ! token.startsWith("Bearer ")) {
            return res.status(401).send({message: "Token missing or invalid", success: false});
        }

        const tokenValue = token.split(" ")[1];

        jwt.verify(tokenValue, process.env.JWT_SECRET_TRAINER, async (err, decoded) => {
            if (err || decoded.role !== "TRAINER") {
                return res.status(401).json({message: "Authentication failed", success: false});
            }

            // for more security is there a trainer IN DATABASE with the decoded id from token
            const trainer = await trainerModel.findOne({_id:decoded.id})   
            const verified = trainer.email_verification
            if(!trainer || !verified){
                return res.status(401).json({message: "No such verified trainer in database", success: false});
            }
            
            req.body.trainerId = decoded.id;
            // console.log(req.body.trainerId);
            // console.log('passes auth middleware')
            next();

        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: "Internal server error", success: false});
    }
};
