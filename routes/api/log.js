const user = require('../../db').User
const route = require('express').Router()

route.post('/', (req, res)=>{
	user.findAll({
	 	where:{
	 		email:req.body.email,
     password: req.body.password,
	 	}
	 	
	 }).then((users) => {
	 	  if(users.length==0){
	 	  	res.status(201).json({'message':'could not find'});
	 	  }
	 	  else{
        res.status(201).send(users)
    }
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new user"
        })
    })
})

exports = module.exports = route