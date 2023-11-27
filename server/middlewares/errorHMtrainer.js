// ******** ERROR HANDLING MIDDLEWARE

// USED TO CHECK IS USER NOT BLOCKED IN ALL TIME - SOME TIMES ADMIN MAY BLOCK A LOGGED IN USER - FOR THAT SCENARO

const trainerModel = require('../models/trainerModel')

module.exports = async(req,res,next)=>{

    try {
          
           const trainer = await trainerModel.findOne({_id:req.body.trainerId})
           if(!trainer.admin_verification)
           {
              return res.status(200).send({ message:"Your account is blocked. Contact an admin for assistance.", success: false})
           }
           else{
            //   console.log('passes error handling midlware');
            //   console.log(req.body.trainerId)
               next()
           }
       
    } catch (error) {
        return res.status(401).send({ message: "Auth-z failed", success: false})
    }
}