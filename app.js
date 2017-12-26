const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api', function (req, res) {
    res.json({
        message:"Welcome to the API"
    });
});

app.post('/api/posts', verifyToken, function (req, res) {

    jwt.verify(req.token, 'secretkey', function (err, authData) {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:'Post Created',
                authData
            })
        }
    })

    res.json({
        message:"Post Created"
    });
});

app.post('api/login', function (req, res) {
    // Mock User

    const user = {
        id:1,
        username:'Arjun',
        email:'arjunmaini007@gmail.com'
    }

    jwt.sign({user:user}, 'secretkey', {expiresIn: '30s'}, function (err, token) {
        res.json({
            token:token
        })
    })
});

// Format of TOKEN

// Authorisation : Bearer <access_token>

function verifyToken(req, res, next){

    const bearerHeader = req.headers['authorisation'];

    if(typeof bearerHeader !==  'undefined'){
        // Splice at the space
        const bearer = bearerHeader.splice(' ');
        // Get token from the array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // middleware
        next();

    }else{
        // Forbidden
        res.sendStatus(403);
    }
}



app.listen(5353, function(){
console.info("Server has started on http://localhost:5353/")
})