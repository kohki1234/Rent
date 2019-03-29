const express = require('express');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();
const jwt = require('jsonwebtoken');


// router.post('/signup',(req, res, next)=> {
//     res.status(200).json(
//         {
//             message: 'test message : response from NodeJS',
//             filed : "IT",
//             DB : "MySQL",
//             FrontendFramework: "Angular/ Jquery",
//             BackendFramework: "Express"
//         },

//         );
// });


router.post('/signup', (req,res,next)=> {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            isAdmin: 0
        });

        user.save().then(result => {
            res.status(200).json({message: "New user is created !!"});
        }).catch(error => {
            console.log(error);
        });
    }) ;
});


router.post('/login', (req, res, next)=> {
    let fetchedUser;
    User.findOne({email: req.body.email}).then(user => {
        fetchedUser = user;
        if (!user) {
            return res.status(404).json({message : "Auth failed"});
        }

        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            res.status(404).json({message : "Auth failed"});
        }

        const administrator = fetchedUser.isAdmin;
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret-long', {expiresIn: '1h'});
        res.status(200).json({token: token, expiresIn: 3600, admin: administrator});
    }).catch(err=> {
        console.log(err);
    });
});

module.exports = router;