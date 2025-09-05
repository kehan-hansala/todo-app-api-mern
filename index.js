// express, nodemon, dotenv, mongoose, bcrypt, jsonwebtoken, body-parser
const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

const UserRoute= require('./routes/UserRoute');
const TodoRoute= require('./routes/TodoRoute');

const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp';

mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log("Mongo db connected");
        app.listen(PORT, ()=>{
            console.log(`server started and running on port ${PORT}`);
        });
    }).catch((error)=>console.error('Mongo Db Error', error));

app.get('/test', (req, resp)=>{
    return resp.json({'message':'server started!'})
});

app.use('/api/v1/users', UserRoute); // http://localhost:3000/api/v1/users/signup
app.use('/api/v1/todos', TodoRoute);