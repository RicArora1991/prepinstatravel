
const signupRecord = require('../models/signupschema')
const jwt=require('jsonwebtoken');
const showSignUpPage=async(req,res)=>{
    try{
        res.render('signup');
    }
    catch(e){
        console.log(e);
        res.status(500).send("Failed to load signup page");
    }
};
const signUpUser=async(req,res)=>{
    try{
        const { username, email, password } = req.body;
        console.log('details', username, email, password);
        const signupDetails = await signupRecord({
            username: username,
            email: email,
            password: password
        })
        // console.log('signupDetails', signupDetails);
        const savingsignupDetails = await signupDetails.save();
        console.log(savingsignupDetails);
        // res.json(savingsignupDetails);
            res.redirect('/login');
    }
    catch(e){
        console.log(e);
    }
}

const showLoginPage=async(req,res)=>{
    try{
        res.render('login');
    }
    catch(e){
        console.log(e);
        res.status(500).send("Failed to load signup page");
    }
};
const loginUser=async(req,res)=>{
    try{
        const {  email, password } = req.body;
        console.log('details', email, password);
        
        const userDetails=await signupRecord.findOne({email:email});
        const generateToken=(userData)=>{
            return jwt.sign(userData,'hsgdhsdvcbvcscvbncvsbnfshjcbsncdgsahdghsnvcdbxcvbchscbnsc',{expiresIn:'1h'});
            }
            console.log('userdetails',userDetails);
            const token=generateToken({username:userDetails.username,email:email});
            console.log('token is ',token);
            res.cookie('username',userDetails.username);
            res.cookie('email',userDetails.email);

            res.cookie('jwt',token,{httponly:true});

        if(userDetails){
            // res.redirect('destinations',{username:userDetails.username});
            //  req.session.username=userDetails.username;
            res.redirect('/destinations');
        }
    }
    catch(e){
        console.log(e);
    }
}


module.exports={signUpUser,showSignUpPage,loginUser,showLoginPage}