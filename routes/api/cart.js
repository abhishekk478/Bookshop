const Cart = require('../../db').Cart
const Product = require('../../db').Product
const db = require('../../db').db

const route = require('express').Router()
const Sequelize = require('sequelize')


route.post('/', (req, res) => {
    // We expect the req to have name in it
    // We will create a new user
    Cart.findAll({
        where :{
            User_id:parseInt(req.body.User_id),
            Product_id : parseInt(req.body.Product_id)
        }
    }).then((cart) => {
        if(cart.length == 0){
            addtocart()
        }
        else if(cart.length) {
            res.status(201).send({message:"you cannot add products"})
        }

    })
        .catch((err) => {
            res.status(501).send({
                error: "Error fetching products"
            })
        })


    function addtocart()
    {
        Cart.create({
            User_id:parseInt(req.body.User_id),
            Product_id:req.body.Product_id,

        }).then((user) => {
            res.status(201).send(user)
        }).catch((err) => {
            res.status(501).send({
                error: "Could not add new user"
            })
        })

    }
})






route.post('/cartfetch', (req, res) => {

    db.query('select carts.User_id,users.address,users.firstName,users.lastName,products.* from carts inner join products on carts.Product_id=products.id inner join users on carts.User_id=users.id where carts.User_id=?',{replacements: [req.body.User_id], type: Sequelize.QueryTypes.SELECT} )
        .then(function(cart)  {
            console.log(cart)
            res.status(201).send(cart)
        }).catch((err) => {
        res.status(501).send({
            error: "Could not retreive"
        })
    })



})





route.post('/cart_destroy',(req,res) =>{
    Cart.destroy({
        where: {
            User_id:parseInt(req.body.User_id),
            Product_id:req.body.Product_id,
        }
    }).then(()=> {
        res.status(201).send({message:"deleted"})
    }).catch((err) => {
        res.status(501).send({
            error: "Could not delete"
        })
    })

})


exports = module.exports = route