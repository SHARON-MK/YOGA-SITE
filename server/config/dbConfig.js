const { error } = require('console');

const mongoose = require('mongoose')

// NEED TO REQUIRE DOTENV AS IT IS BEING USED IN THIS FILE
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log('Mongo DB connection successfull');
})

connection.on('error', ()=>{
    console.log('An error in Mongo Db connection', error);
})

module.exports = mongoose