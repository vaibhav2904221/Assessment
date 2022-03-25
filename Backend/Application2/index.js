
var amqp = require('amqplib/callback_api');
const userModel=require('./models/user.model')

const express=require('express')
const bodyparser = require('body-parser');
const cors = require('cors');

var app = require('express')();
app.use(bodyparser.json())
var http = require('http').Server(app);
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');


// import path
const path = require('path');
app.use(cors());

app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());


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


amqp.connect('amqp://localhost:5672', function(err, conn) {
    // this function will be called when the connection is created
    // `err` will contain the error object, if any errors occurred
    // `conn` will contain the connection object

    if (err != null) bail(err); // calls `bail` function if an error occurred when connecting
     consumer(conn); // creates a consumer
    // publisher(conn); // creates a publisher
});

function bail(err) {
    console.error(err);
    process.exit(1);
}


var q = 'jobs';
 function consumer(conn) {
    var ok = conn.createChannel(on_open); // creates a channel and call `on_open` when done
    function on_open(err, ch) {
        // this function will be called when the channel is created
        // `err` will contain the error object, if any errors occurred
        // `ch` will contain the channel object

        if (err != null) bail(err); // calls `bail` function if an error occurred when creating the channel
        ch.assertQueue(q); // asserts the queue exists
        ch.consume(q, function(msg) { //consumes the queue
            if (msg !== null) {
                console.log("valuesss",msg.content.toString())
                console.log("datataa",msg.content.toString().mobile); // writes the received message to the console
                 ch.ack(msg); // acknowledge that the message was received
                 var value=msg.content.toString().mobile;
                 const users = new userModel({
                     name: value,
                    // email: msg.content.toString().email,
                    // mobile: msg.content.toString().mobile,
                   });
              users.save().then((result) => {
                res.status(200).json({
                  device: result,
             });
              });
            }
        });
    }
}




mongoose.connect(
    environments.MONGO_URL + '/' + environments.DB_NAME, {
        useNewUrlParser: true
})
.then((db) => {
    console.log(`Connected to DB ${environments.DB_NAME} Successfully!`);
})
.catch((e) => {
    console.log("error occured in db connection: ", e);
})





http.listen(4000, () => {
    console.log(`Server Started. Listening on 4000 !`);
});
