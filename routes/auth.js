const express = require('express');
const router = express.Router();
const User = require('./../model/User');
const bcrypt = require('bcrypt');

router.get('/signin', (req, res, next) => {
    res.render('/auth/signin');
});

router.get('/signup', (req, res, next) => {
    res.render('/auth/signup');
});

router.get('/signout', (req, res, next) => {
    req.session.destroy((error) => {
        console.log(error);
        res.redirect('/signin');
    })
});

// router.post('/signin', (req, res, next) => {
//     res.render('auth/signin');
// });

// router.post('/signup', (req, res, next) => {
//     res.render('auth/signup');
// });