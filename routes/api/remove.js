const Product = require('../../db').Product
const Cart = require('../../db').Cart
const Wishlist = require('../../db').Wishlist
const route = require('express').Router();
const Sequelize = require('sequelize')

route.post('/', (req, res) => {
    // Get all products
    Product.findAll({
        where: {SellerId: req.body.User_id, dstatus: 1}
    }).then((products) => {
            res.status(201).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })
})

route.post('/remove_destroy',(req,res) =>{
    Product.update({
            status: 0,
        },
        {
            where: {
                SellerId:parseInt(req.body.User_id),
                id:req.body.Product_id,
            }
        })

    Wishlist.destroy({
        where: {
            Product_id:req.body.Product_id,
        }
    })

    Cart.destroy({
        where: {
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

route.post('/remove_complete',(req,res) =>{
    Product.update({
            status: 0,
            dstatus: 0,
        },
        {
            where: {
                SellerId:parseInt(req.body.User_id),
                id:req.body.Product_id,
            }
        })

    Wishlist.destroy({
        where: {
            Product_id:req.body.Product_id,
        }
    })

    Cart.destroy({
        where: {
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