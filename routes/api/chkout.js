const Chkout = require('../../db').Chkout
const db = require('../../db').db

const route = require('express').Router()
const Sequelize = require('sequelize')


route.post('/', (req, res) => {
    Chkout.create({
        User_id: parseInt(req.body.User_id),
        AuthorName: req.body.AuthorName,
        BookName:   req.body.BookName,
        condition: req.body.condition,
        Product_id:  parseInt(req.body.id),
        price: parseFloat(req.body.price),
    }).then((data) => {
        res.status(201).send(data)
    }).catch((error) => {
        res.status(501).send({
            error: "Error Sending Message"
        })
    })
})

route.post('/checkoutfetch', (req, res) => {

    Chkout.findAll({
        where :{
            User_id : req.body.User_id
        }
    }).then(function(chkout)  {
            console.log(chkout)
            res.status(201).send(chkout)
        }).catch((err) => {
        res.status(501).send({
            error: "Could not retreive "
        })
    })



})

exports = module.exports = route