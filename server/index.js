const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  
const fs = require('fs');
const http = require('http');

const app = express();

var model = require('../database-mongo');
var Clarifai = require('clarifai');
var httpHelper = require('./httpHelper.js');

const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const webpack = require('webpack');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/items', function (req, res) {

  // var imageUrl = 'https://samples.clarifai.com/metro-north.jpg';
    var imageUrl;

  // get the name of property and value of the property of the image given
  httpHelper.getClarifaiData(imageUrl)
  .then((response) => { 

    var concepts = response.outputs[0].data.concepts;
    
    var respObj = {
      imgUrl: imageUrl,
      items: concepts,
      data: concepts.map((item) => { return {
        "name": item.name,
        "value": Math.floor(item.value * 10000)/100};
      })
    };
    res.json(respObj);
  })
  .catch((err) => { console.log(err, " I am the error")});

});

app.post('/items/search', function (req, res) {

  var imageUrl = req.body.imageUrl;

  // get the name of property and value of the property of the image given
  httpHelper.getClarifaiData(imageUrl)
  .then((response) => { 

    var concepts = response.outputs[0].data.concepts;
    
    var respObj = {
      imgUrl: imageUrl,
      items: concepts,
      data: concepts.map((item) => { return {
        "name":item.name, 
        "value": Math.floor(item.value * 10000)/100};
      })
    };

    // saving to the DB
    var newImg = new model.Item(respObj);      
    newImg.save(function (err, newImg) {
      if (err) return console.error(err);
    });

    // for displaying image
    res.json(respObj);
  })
  .catch((err) => { console.log( err, " I am the error")}); //err,


})

app.post('/api/account/signup',(req, res, next) => {
    const { body } = req ;
    const {
        firstName,
        lastName,
        password,
    } = body;
    let { email } =  body ;
    if (!firstName) {
        return res.send({
            success: false,
            message: 'Error: first name cannot be blank'
        })
    }
    if (!lastName) {
        return res.send({
            success: false,
            message: 'Error: last name cannot be blank'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: password cannot be blank'
        })
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: email cannot be blank'
        })
    }
    email = email.toLowerCase();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
        email: email
    }, (err,previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            });
        }

        //save the new user
        const newUser = new User()
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err,user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed up'
            })
        })
    })

})
app.put('/api/account/update/score', (req,res,next) => {
    const { body } = req;
    const { token , score } = body;

    UserSession.findOne({
        _id: token,
        isDeleted: false
    },(err,session) => { // todo , check why when does not find, it returns error
        if(err) {
            return res.send({
                success: false,
                message: 'server error'
            })
        }
        // console.log(session);
        if (!session){
            return res.send({
                success: false,
                message: 'no session'
            })
        }

        const { userId } = session;

        User.findByIdAndUpdate(userId, {$inc : {'score' : score}} , {new: true}, (err,user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'server error'
                })
            } else {
                return res.send({
                    success: true,
                    message: 'all fine',
                    score: user.score
                })
            }
        })

    })



})

app.get('/api/account/score', (req,res,next) => {
    const { query } = req;
    const { token } = query;
    //console.log("here");
    UserSession.findOne({
        _id: token,
        isDeleted: false
    },(err,session) => { // todo , check why when does not find, it returns error
        if(err) {
            return res.send({
                success: false,
                message: 'server error'
            })
        }
        // console.log(session);
        if (!session){
            return res.send({
                success: false,
                message: 'no session'
            })
        }

        const { userId } = session;

        User.findById(userId, (err,user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'server error'
                })
            } else {
                return res.send({
                    success: true,
                    message: 'all fine',
                    score: user.score
                })
            }
        })

    })

})
app.post('/api/account/login',(req, res, next) => {
    const { body } = req ;
    const {
        password,
    } = body;
    let { email } =  body ;

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: password cannot be blank'
        })
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: email cannot be blank'
        })
    }

    email = email.toLowerCase();

    User.find({
        email: email
    } , (err,users) => {
        if(err) {
            return res.send({
                success: false,
                message: "Server error"
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: "Invalid username or password"
            });
        }
        const user = users[0];

        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: "Invalid username or password"
            });
        }

        //if code went so far, password is correct .
        // therfore create user session

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err,session) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Logged in',
                token: session._id
            })
        })
    })

})

//todo , change to post request
app.get('/api/account/verify', (req,res,next) => {
    const {query} = req;
    const {token} = query;

    UserSession.findOne({
        _id: token,
        isDeleted: false
    },(err,session) => { // todo , check why when does not find, it returns error
        if(err) {
            return res.send({
                success: false,
                message: 'server error'
            })
        }
        //    console.log(session);
        if (!session){
            return res.send({
                success: false,
                message: 'no session'
            })
        }
        return res.send({
            success: true,
            message: 'verified'
        })


    })

})

app.get('/api/account/logout',(req,res,next)=> {
    const {query} = req;
    const {token} = query;

    UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        },
        {
            $set:{isDeleted:true}
        },
        (err,session) => { // todo , check why when does not find, it returns error
            if(err) {
                return res.send({
                    success: false,
                    message: 'server error'
                })
            }
            //  console.log(session);
            return res.send({
                success: true,
                message: 'logged out'
            })
        })

})

var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log('listening on port 3001!');
});

module.exports = app;
