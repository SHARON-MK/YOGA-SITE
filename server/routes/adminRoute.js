const express = require('express')
const route = express()
const authMiddleware = require('../middlewares/authAdmin')
const adminController = require('../controller/adminController')

route.post('/login',adminController.login)

route.use(authMiddleware)  // so this middleware will be applies to all below routes first 

route.post('/get-admin-info-by-id',adminController.authorization)
route.get('/get-userdata',adminController.userList)
route.post('/blockActionUser',adminController.blockActionUser)
route.get('/get-trainerData',adminController.trainerList)
route.post('/blockActionTrainer',adminController.blockActionTrainer)

route.post('/addCategory',adminController.addCategory)
route.get('/categoryList',adminController.categoryList)
route.post('/blockCategory',adminController.blockCategory)



module.exports = route
