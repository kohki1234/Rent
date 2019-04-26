const express = require('express');
const cors = require('cors');
const multer = require('multer');
const router = express.Router();
const Car = require('./models/car');
const user = require('./models/user');


const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req,file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

router.post('/save-image', upload.array('file'), (req, res)=> {
    res.status(201).json({message: 'image uploaded'});
});


router.post('/create-car', (req, res, next) => {
    const car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        power: req.body.power,
        seats: req.body.seats,
        imgUrl: req.body.imgUrl
    });

    car.save().then(response => {
        res.status(201).json({message : "Car is created"});
    }).catch(error => {
        console.log(error);
    })
});

router.get('/users', (req, res, next) => {
    user.find({}, 'email isAdmin').then(user => {
        if (!user) {
            res.status(404).json({message: "no user found..."});
        }
        res.status(200).json(user);
    }).catch(error => {
        console.log(error);
    });
})

module.exports = router;