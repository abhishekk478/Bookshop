const Product = require('../../db').Product
const route = require('express').Router();
const Sequelize = require('sequelize')


loginrequired = function(req,res,next){
    if(req.user){
        next();
    }else{
        return res.status(401).json({message:'Please Login'})
    }
    
} 

route.get('/', (req, res) => {
    // Get all products
    Product.findAll({
        where: {status: 1},
    })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })
})

route.post('/', (req, res) => {
    // Validate the values
    if (isNaN(req.body.price)) {
        return res.status(403).send({
            error: "Price is not valid number"
        })
    }
    // Add a new product
   Product.create({
        BookName: req.body.bname,
        AuthorName: req.body.aname,
        email: req.body.email,
        description: req.body.description,
        price: parseFloat(req.body.price),
        condition: req.body.condition,
        sellerId : parseInt(req.body.sellerId)
    }).then((product) => {
        return res.status(201).send(product);
    }).catch((error) => {
        return res.status(501).send({
            error: "Error adding product"
        })
    })
})

route.post('/filter',(req, res) => {
  console.log(req.body.data)
  Product.findAll(

    { where: { condition: 
                { $like: req.body.condition
                } 
             }

    })
        .then((products) => {
            res.status(200).json(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })



})

route.post('/filterbybook',(req, res) => {
  
  Product.findAll(

    { where: { BookName: 
        {     
            $like: Sequelize.fn('lower','%' + req.body.bookname + '%'), 
           } 
        }

    })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })



})

route.post('/filterbyAuthor',(req, res) => {
  
  Product.findAll(

    { where: { AuthorName: 
        {     
            $like: Sequelize.fn('lower','%' + req.body.authorname + '%'), 
           } 
        }

    })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })



})

route.get('/filterbylow',(req, res) => {
  
  Product.findAll({
         order: Sequelize.literal('price ASC')       
    })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })

})
route.get('/filterbyhigh',(req, res) => {
  
  Product.findAll({
         order: Sequelize.literal('price DESC')       
    })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })

})

route.post('/getbyid',(req, res) => {

    Product.findAll({
        where:{id: parseInt(req.body.Product_id)},
    })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })

})

exports = module.exports = route