const express = require('express')
const route = express()
const authMiddleware = require('../middlewares/authAdmin')
const adminController = require('../controller/adminController')

route.post('/login',adminController.login)

route.use(authMiddleware)  // so this middleware will be applies to all below routes first 


route.get('/get-userdata',adminController.userList)
route.get('/categoryList',adminController.categoryList)
route.get('/get-trainerData',adminController.trainerList)
route.get('/get-chatted-users-list',adminController.chattedUsersList)
route.get('/get-admin-data',adminController.adminData)


route.post('/blockActionUser',adminController.blockActionUser)
route.post('/blockActionTrainer',adminController.blockActionTrainer)
route.post('/get-admin-info-by-id',adminController.authorization)
route.post('/addCategory',adminController.addCategory)
route.post('/blockCategory',adminController.blockCategory)
route.get('/chat-history',adminController.chatHistory)



module.exports = route
