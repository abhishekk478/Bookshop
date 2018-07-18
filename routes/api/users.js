const User = require('../../db').User
const route = require('express').Router()

route.get('/', (req, res) => {
    // We want to send an array of all users
    // From our database here

    User.findAll()
        .then((users) => {
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive users"
            })
        })

})

route.post('/', (req, res) => {
    // We expect the req to have name in it
    // We will create a new user
    User.findAll({
        where: { email: req.body.email},
    }).then((guser) => {
        if(guser.length == 0){
            usrcreate()
        }
        else if(guser.length) {
            res.status(201).send({message:"User already exist"})
        }

    }).catch((err) => {
            res.status(501).send({
                error: "Error creating user"
            })
        })
    console.log(req.body);

    function usrcreate() {
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            college: req.body.college,
            phoneNumber: req.body.phone,
            address: req.body.address,

        }).then((user) => {
            res.status(201).send(user)
        }).catch((err) => {
            res.status(501).send({
                error: "Could not add new user"
            })
        })
    }
})

exports = module.exports = route