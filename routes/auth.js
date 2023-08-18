const express=require('express');
const router=express.Router();
const User=require('./models/User')
const jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');

router.post('/register',[
body('name','Enter Name atleast 4 characters ').isLength({min:4}),
body('email','Enter Valid Email Address').isEmail(),
body('password','Enter password atleast 4 characters ').isLength({min:4}),

],async(req,res)=>{

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
        success: false,
        errors: errors.array()
    });
}



const {email}=req.body;
try{        
let user=await User.findOne({email});

    if (user) {
 return  res.json('Register using valid email address')    
        
    }
    
let salt= await bcrypt.genSalt(10);
let cpassword= await bcrypt.hash(req.body.password,salt)


  

    user=  await User.create({
        name:req.body.name,
        email:req.body.email,
        password:cpassword,
        file:req.body.file
      })

let data={
  user:user.id
}
let key ='PasswordKey'
let token=jwt.sign(data,key)    
let success=true;
const {name,file}=user;
res.json({token,name,file,success})
    

} catch (error) {
    res.json({error:error.message})
}
})



router.post('/login',async(req,res)=>{

const {email,password}=req.body;

let user=await User.findOne({email});

    if (!user) {
 return  res.json('login using valid email address')    
        
    }

let cpassword= await bcrypt.compare(password,user.password)
if (!cpassword) {
  return  res.json('login using valid email address')    
         
     }
     let data={
      user:user.id
    }
    let key ='PasswordKey'
    let token=jwt.sign(data,key)    
let success=true;
     res.json({token,success});

})



router.get('/getuser',async(req,res)=>{

const token=req.header('token');
let key ='PasswordKey'
 let data=await jwt.verify(token,key);
console.log(data);

  let user= await  User.find({_id:data.user}).select("-password");


res.json({user})


})

module.exports=router;

