const express = require('express');
const mongoose = require('./user.db.js');
const UserModel = require('./user.model');
const userAuth = require('./user.auth');

const { JsonWebTokenError, verify } = require('jsonwebtoken');
const router = express.Router();
router.post('/register', (req, res) => {
    const user = new UserModel({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        age:req.body.age,
        state:req.body.state,
        country:req.body.country,
        birthday :moment(bday),
  years :moment().diff(birthday, 'years')}
    )
    user.save().then(() => {
        res.status(201).send('you are register successfuly')
    })
        .catch((error) => {
            console.log(error)
            res.status(401).send('invalied')

        })

})



router.get('/login', (req, res) => {
    UserModel.findOne({ email: req.body.email, password: req.body.password }).then((user) => {
        if (!user) {
            res.send('User not found');
        } else {
            userAuth.jetToken(user, (err, token) => {
                res.json({
                    user: user,
                    token: token
                });
            });
        }


    });
});
router.post('/changepassword',(req,res)=>{
    UserModel.findOne(req.body.firstname,(err,user)=>{
        if(err){
            res.send(err)
        }
        else {
           const pass= user.changePassword(req.body.password, 
            req.body.newpassword, function (err) {
                console.log(pass)
                if (err) {
                    res.send(err);
                } else {
                    res.send('successfully change password')
                }
                

            }
            )
        }})
})
router.get('/userinfo', userAuth.extractToken, userAuth.verifyToken, (req, res, next) => {
    // req.auth // scheme, token, user
    res.json(req.auth.user);
})

router.get('/verify-password',(req,res)=>{
    res.send('password verify succesfully')

})
     


module.exports = router;