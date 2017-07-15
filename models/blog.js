
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
        allowNull:false,
        primaryKey:true
    },
},
{
	freezeTableName:true,
	timestamps:true,

}),


signup=connection.seq.define('signup',{
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
signup.sync();


//route to enter data in db to give access to users
router.post('/signup',function(req,res){
    var found=false;
    data_body=req.body;
    signup.find({
        where:{
            user_email:data_body.user_email
        }
    }).then((signup)=>{
        if(signup)
        {
            found=false;
        }
        else
        {
            found=true;
        }
    }).then(()=>{
        if(found==true)
        {
            signup.create({
                user_email:data_body.user_email,
                user_password:data_body.user_password
            })

            res.send("Data has been stored on the database"+"Go Green, Encash your trash!!");
        }
        else
        {
            res.send("The email id "+data_body.user_email+" exixts!, Please add some other email :)")
        }

    })
})

//for log in the user
router.post('/login',function(req,res){
    data_body=req.body;
    console.log(data_body);
    signup.find({
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
            
            res.send("Sorry you don't have access rights to this Blogging Platform, Please contact Admin!!");
        }
    })
});

router.post("/post",function(req,res){ 
    data_body=req.body;
    console.log(data_body);
    login.create({
        user_post:data_body.user_post,
        user_email:data_body.user_email
    })

    res.send("Your content has been posted to Shuttlescrap.com!!");
});


module.exports=router;
