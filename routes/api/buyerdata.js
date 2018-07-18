const Product = require('../../db').Product
const route = require('express').Router();
const Sequelize = require('sequelize')
var mailer = require("nodemailer");
route.post('/',(req, res) => {
        var fname    = req.body.firstName
        var lname    = req.body.lastName
        var bname    = req.body.BookName
        var Aname    = req.body.AuthorName
        var price    = req.body.price
        var email   = req.body.email
        console.log(fname);
        console.log(lname);
        console.log(bname);
        console.log(Aname);
        console.log(price);
        console.log(email);

// Use Smtp Protocol to send Email
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    var smtpTransport = mailer.createTransport("smtps://bookshalateam@gmail.com:"+encodeURIComponent('bookshalateam@') + "@smtp.gmail.com:465"); 

var mail = {
    from: "bookshalateam@gmail.com",
    to: email,
    subject: "Buyer Details",
    text: "<a>http://localhost:2000/confirmation</a>",
    html:  '<p>FirstName: ' +fname+  '</p>'+
           '<p>Lastname: ' +lname+   '</p>'+
           '<p>Bookname: ' +bname+  '</p>'+
           '<p>Authorname: ' +Aname+   '</p>'+
           '<p>price: ' +price+   '</p>'
         
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
});
  




})







exports = module.exports = route