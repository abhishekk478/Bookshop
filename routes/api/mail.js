const Product = require('../../db').Product
const route = require('express').Router();
const Sequelize = require('sequelize')
var mailer = require("nodemailer");
route.post('/',(req, res) => {

// Use Smtp Protocol to send Email
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    var smtpTransport = mailer.createTransport("smtps://bookshalateam@gmail.com:"+encodeURIComponent('bookshalateam@') + "@smtp.gmail.com:465");

    var mail = {
        from: "bookshalateam@gmail.com",
        to: req.body.email,
        subject: "Confirmation Mail",
        text: "<a>http://localhost:4200/chngpwd</a>",
        html:  '<p>Click <a href="http://localhost:4200/chngpwd">here</a> to reset your password</p>'

    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
            res.status(501).send({
                error: "Could not send"
            })
        }else{
            console.log("Message sent: " + response.message);
            res.status(201).send({message : "Mail Sent"})
        }

        smtpTransport.close();
    });





})
exports = module.exports = route
