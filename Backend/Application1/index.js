const express = require('express');
//  const User = require('../models/user');

const bodyparser = require('body-parser');

const { body, validationResult } = require('express-validator');

// const amqp = require('amqplib')
var amqp = require('amqplib/callback_api');

//import mongoose
const mongoose = require('mongoose');
const cors = require('cors');

var app = require('express')();
app.use(bodyparser.json())
var http = require('http').Server(app);

// import path
 const path = require('path');
 app.use(cors());

 


const environments = require('./environments/environment');




 


// header middleware

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,Content-type, Authorization, x-access-token');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// cors middleware
app.options('*', cors());


//add User API
app.post('/api/user/add',body('email').isEmail().normalizeEmail(),
body('mobile').isLength({
    min: 10
}),(req,res,next) =>{
    const errors = validationResult(req);
if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
}
users=req.body;
console.log('userss',users)
 next();

})   



// console.log("dataa",req)
app.use(body('email').isEmail().normalizeEmail(),body('mobile').isLength({
    min: 10
}),(req,res,next)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
}
else{
    console.log("The variable is", users);
    res.status(200).send("data received Successfully from app1!!")
    // next();
   }


// connects to rabbitmq
amqp.connect('amqp://localhost:5672', function(err, conn) {
    // this function will be called when the connection is created
    // `err` will contain the error object, if any errors occurred
    // `conn` will contain the connection object

    if (err != null) bail(err); // calls `bail` function if an error occurred when connecting
    // consumer(conn); // creates a consumer
    publisher(conn); // creates a publisher
});

function bail(err) {
    console.error(err);
    process.exit(1);
}

//producer
var q='jobs';
var mesg=users;
function publisher(conn) {
    conn.createChannel(on_open); // creates a channel and call `on_open` when done
    function on_open(err, ch) {
        console.log("dataa33333",mesg)
        // var mesg=users;
        // this function will be called when the channel is created
        // `err` will contain the error object, if any errors occurred
        // `ch` will contain the channel object

        if (err != null) bail(err); // calls `bail` function if an error occurred when creating the channel
        ch.assertQueue(q,{durable:true}); // asserts the queue exists
        ch.sendToQueue(q, Buffer.from(JSON.stringify(mesg)),{persistent: true}); // sends a message to the queue
         console.log(" [x] Sent '%s'", JSON.stringify(mesg));
        // conn.close(); // <=== close connection here
    }
}

});














// mongoose.connect(
//     environments.MONGO_URL + '/' + environments.DB_NAME, {
//         useNewUrlParser: true
// })
// .then((db) => {
//     console.log(`Connected to DB ${environments.DB_NAME} Successfully!`);
// })
// .catch((e) => {
//     console.log("error occured in db connection: ", e);
// })





http.listen(5000, () => {
    console.log(`Server Started. Listening on 5000 !`);
});