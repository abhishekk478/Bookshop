const Message = require('../../db').Message
const route = require('express').Router();
const Sequelize = require('sequelize')
const db = require('../../db').db

route.post('/', (req, res) => {
    Message.create({
        User_id: parseInt(req.body.userid),
        Product_id: parseInt(req.body.productid),
        Seller_id: parseInt(req.body.sellerid),
        message: req.body.message,

    })
    Message.findAll({
    }).then((message) => {
        res.status(201).send(message);
    }).catch((error) => {
        res.status(501).send({
            error: "Error Sending Message"
        })
    })

})

route.post('/reply', (req, res) => {
     Message.create({
        User_id: parseInt(req.body.userid),
         Product_id: parseInt(req.body.productid),
        Seller_id: parseInt(req.body.sellerid),
        message: req.body.message,
    
    })
    Message.findAll({
         }).then((message1) => {
        if(message1.length >= 0)
        {
            mupdate();
        }
        else{
            res.status(201).send(message1);
        }
    }).catch((error) => {
        res.status(501).send({
            error: "Error Sending Message"
        })
    })
    function mupdate() {
        Message.update({
                status: req.body.status,
            },
            {
                where: {
                    id: parseInt(req.body.id),
                },
            }).then((message) => {
            res.status(201).send(message)
        }).catch((error) => {
            res.status(501).send({
                error: "Error Sending Message"
            })
        })
    }
    
})

route.post('/fetchmessages', (req, res) => {
         
    db.query('select messages.*,products.AuthorName,products.BookName,users.email from messages inner join products on messages.Product_id= products.id inner join users on messages.User_id=users.id where messages.Seller_id=?',{replacements: [req.body.sellerid], type: Sequelize.QueryTypes.SELECT} )
    
  .then((message) => {
        if(message.length==0){
            res.status(201).send({message : "Sorry you dont have any message to View"})
        }
        else{
        res.status(201).send(message)
        }
    }).catch((error) => {
        res.status(501).send({
            error: "Error Receiving Message"
        })
    })
    
})




exports = module.exports = route
