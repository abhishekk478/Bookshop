const user = require('../../db').User
const route = require('express').Router()

route.post('/', (req, res)=>{
    user.findAll({
        where:{
            email:req.body.email,
        }

    }).then((users) => {
        if(users.length==0){
            res.status(201).json({users});
        }
        else if(users.length) {
            chng();
        }
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new user"
        })
    })
    function chng() {
        user.update({
                password: req.body.password,
            },
            {
                where:{
                    email: req.body.email,
                },
        }).then(()=> {
            res.status(201).json({'message':"changed"})
        }).catch((err) => {
            res.status(501).send({
                error: "Could not change"
            })
        })
    }
})

exports = module.exports = route