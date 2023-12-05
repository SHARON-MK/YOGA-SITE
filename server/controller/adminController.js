const userModel = require('../models/userModel')
const trainerModel = require('../models/trainerModel')
const categoryModel = require('../models/categoryModel')
const chatModel = require('../models/chatModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = async(req,res)=>{
    try {
        console.log('3');
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:'Admin does not exist', success:false})
        }
        if(!user.admin){
            return res.status(200).send({message:'Not an admin', success:false})
        }

        const passMatch = await bcrypt.compare(req.body.password, user.password)
        if(!passMatch){
            return res.status(200).send({message:'Password is incorrect', success:false})
        }else{
            const token = jwt.sign( {id : user._id, role:"ADMIN"}, process.env.JWT_SECRET_ADMIN, {expiresIn:'1d'} )
            res.status(200).send({message:'Login successfull', success:true, data:token})
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({message:'Error Logging in', success:false, "error": "Internal server error. Please try again later."})
        
    }
}

// for this - /api/admin/get-user-info-by-id
const authorization = async(req,res)=>{
    try {
        const user = await userModel.findOne({_id: req.body.userId})
        if(!user){
            return res.status(200).send({ message: "User does not exist", success: false})
        }
        else{
            return res.status(200).send({ success: true, data: { name: user.name, email: user.email }})
        }
    } catch (error) {
        return res.status(500).send({ message: "Error getting user info", success: false, error})
    }
}



const userList = async(req,res) =>{
     try {
        userData = await userModel.find({email_verification:true})
        if(!userData){
            return res.status(200).send({message:'no users present', success:false})
        }
        res.status(200).send({message:'users data fetched', success:true, data:userData})
     } catch (error) {
        res.status(500).send({message:'something wet wrong', success:false})
     }

}

const trainerList = async(req,res) =>{
    try {
       trainerData = await trainerModel.find({email_verification:true})
       if(!trainerData){
           return res.status(200).send({message:'no users present', success:false})
       }
       res.status(200).send({message:'trainer data fetched', success:true, data:trainerData})
    } catch (error) {
        console.log('2');
       res.status(500).send({message:'something wet wrong', success:false})
    }

}

const blockActionTrainer = async(req,res)=>{
    try {
        console.log(req.body);
        const trainer = req.body;
        if(trainer.admin_verification){
            await trainerModel.updateOne({email:trainer.email},{$set:{admin_verification:false}})
            const updatedTrainerDta = await trainerModel.find({email_verification:true})
            res.status(200).send({message:'Trainer Blocked', success:true, data:updatedTrainerDta})
       }
       else{
        await trainerModel.updateOne({email:trainer.email},{$set:{admin_verification:true}})
        const updatedTrainerDta = await trainerModel.find({email_verification:true})
        res.status(200).send({message:'Trainer Verified', success:true, data:updatedTrainerDta})
       }
    } catch (error) {
        res.status(500).send({message:'something wet wrong', success:false})
    }
}


const blockActionUser = async(req,res)=>{
    try {
        const user = req.body;
        if(user.blocked){
            await userModel.updateOne({email:user.email},{$set:{blocked:false}})
            const updatedUserDB = await userModel.find({email_verification:true})
            res.status(200).send({message:'User UnBlocked', success:true, data:updatedUserDB})
       }
       else{
        await userModel.updateOne({email:user.email},{$set:{blocked:true}})
        const updatedUserDB = await userModel.find({email_verification:true})
        res.status(200).send({message:'User Blocked', success:true, data:updatedUserDB})
       }
    } catch (error) {
        res.status(500).send({message:'something wet wrong', success:false})
    }
}


const addCategory = async(req,res)=>{
    try { 
        const categoryExists = await categoryModel.findOne({name:req.body.name})
        if(categoryExists)
        {
            return res.status(200).send({message:'This category already exists',success:false})
        }
        const newCategoryDocument = new categoryModel(req.body)
        await newCategoryDocument.save()
        res.status(200).send({ message: 'Category added successfully', success: true })
        
    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
    }
}


const categoryList = async(req,res)=>{
    try { 
        const categoryList = await categoryModel.find()
        if(!categoryList)
        {
            return res.status(200).send({message:'No categories exist',success:false})
        }
        res.status(200).send({ message: 'Category Fetched successfully', success: true, data: categoryList })
        
    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
    }
}


const blockCategory = async(req,res)=>{
    try {
        const category = req.body;
        console.log(category);
        if(category.status){
            await categoryModel.updateOne({name:category.name},{$set:{status:false}})
            const updatedCategoryDta = await categoryModel.find()
            res.status(200).send({message:'Category Blocked', success:true, data:updatedCategoryDta})
       }
       else{
        await categoryModel.updateOne({name:category.name},{$set:{status:true}})
        const updatedCategoryDta = await categoryModel.find()
        res.status(200).send({message:'Category Verified', success:true, data:updatedCategoryDta})
       }
    } catch (error) {
        res.status(500).send({message:'something wet wrong', success:false})
    }
}

const chattedUsersList = async (req, res) => {
    try {
        
        const chatDocuments = await chatModel.find();

        if (chatDocuments.length === 0) {
            return res.status(200).send({ message: 'No chat history found', success: true, data: null });
        }

        const senderIds = chatDocuments.flatMap(chat => chat.history.map(item => item.sender_id));

        const nonAdminUserDocuments = await userModel.find({ _id: { $in: senderIds }, admin: false });

        res.status(200).send({ message: 'Sender IDs retrieved', success: true, chattedUsers: nonAdminUserDocuments });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong', success: false });
    }
};

const chatHistory = async (req, res) => {
    try {
        const chatData = await chatModel.aggregate([{ $unwind: '$history' }, { $match: { room: req.query.idOfUser } }])
        if (!chatData) {
            return res.status(200).send({ message: 'No chat history', success: false })
        }
        // console.log('chat history data at admin side',chatData)
        
        res.status(200).send({ message: 'success full', success: true, chatData: chatData, adminId: req.body.userId })
    } catch (error) {
        res.status(500).send({ messasge: 'somthing went wrong', success: false })
    }
};

const adminData = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        if (!user) {
            return res.status(200).send({ message: "User does not exist", success: false })
        } else {
            return res.status(200).send({ success: true, data: user })
        }
    } catch (error) {
        return res.status(500).send({ message: "Error getting user info", success: false, error })
    }
}

module.exports ={
    login,
    authorization,
    userList,
    trainerList,
    blockActionUser,
    blockActionTrainer,
    addCategory,
    categoryList,
    blockCategory,
    chattedUsersList,
    chatHistory,
    adminData

}