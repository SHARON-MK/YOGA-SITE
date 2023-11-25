// ******** ERROR HANDLING MIDDLEWARE

// USED TO CHECK IS USER NOT BLOCKED IN ALL TIME - SOME TIMES ADMIN MAY BLOCK A LOGGED IN USER - FOR THAT SCENARO

const userModel = require('../models/userModel')

module.exports = async(req,res,next)=>{

    try {
           const user = await userModel.findOne({_id:req.body.userId})
           if(user.blocked)
           {
              return res.status(200).send({ message:"Your account is blocked. Contact an admin for assistance.", success: false})
           }
           else{
               next()
           }
       
    } catch (error) {
        return res.status(401).send({ message: "Auth-z failed", success: false})
    }
}