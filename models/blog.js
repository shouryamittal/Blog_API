var mymail;
var router = require('express').Router(),
    nodemailer=require('nodemailer')
    connection= require('../connection'),
    wellknown = require('nodemailer-wellknown'),
    sequelize=connection.sequelize,


login=connection.seq.define('login',{

    user_post:{
        type:sequelize.TEXT,
        allowNull:false
    },
    user_email:{
        type:sequelize.STRING,
        allowNull:false
    },
    user_password:{
        type:sequelize.STRING,
        allowNull:false
    }
},
{
	freezeTableName:true,
	timestamps:true,

})


login.sync();

//for log in the user
router.post('/login',function(req,res){
    data_body=req.body;
    mymail=data_body.user_email;
    console.log(data_body);
    var check=false;
    login.find({
        where:{
            user_email:data_body.user_email
        }
    }).then((login)=>{
        if(login)
        {
            res.send(login.user_password);
            console.log(login.user_password);
        }
        else
        {
            
            res.send("You dont have permission");
        }
    })
});

router.post("/post",function(req,res){ 
    data_body=req.body;
    console.log(data_body);
    console.log(mymail);
    login.update({
        user_post:data_body.user_post
    },
        {
            where:{
                user_email:mymail
                }
        })
    res.send("Your post has been saved!");
});


module.exports=router;
