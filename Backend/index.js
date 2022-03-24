const express = require('express');

const bodyparser = require('body-parser');

const { body, validationResult } = require('express-validator');



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

// require('./routes/user')(app);   


 


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
req.users=req.body;
console.log('userss',req.users)
 next();

})   



// console.log("dataa",req)
app.use(body('email').isEmail().normalizeEmail(),body('mobile').isLength({
    min: 10
}),(req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
}
else{
    console.log("The variable is", req.users);
    res.status(200).send("data received Successfully from app1!!")
   }
//  console.log("The variable is", req.users);
    // next();
});



// app.use((req, res, next) => {
//     const err = new Error();
//     err.message = 'Not Found';
//     err.status = 404;
//     next(err);
// });



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





http.listen(5000, () => {
    console.log(`Server Started. Listening on 5000 !`);
});