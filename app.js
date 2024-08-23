const express = require('express');
const app = express();
const PORT = 4000;
const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
// const session=require('express-session');
app.use(cookieparser());
// app.use(session({
//     secret:'hjdfdsvdbdvcbnsgdasdvsbvcshmdns',
//     resave:false,
//     saveUninitialized:false
// }))
const router=express.Router();
const path = require('path');
const destinationRoutes=require('./Routes/destinationroute');
const userController=require('./controllers/userController');
const roomRoutes=require('./Routes/roomRoutes');
require('./db/conn');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.urlencoded({ extended: false }))

const verifyToken=(req,res,next)=>{
    console.log(req.cookies);
    const token = req.cookies.jwt;
    if(!token){
        return res.redirect('/login');

    }
   jwt.verify(token,'hsgdhsdvcbvcscvbncvsbnfshjcbsncdgsahdghsnvcdbxcvbchscbnsc',(err,decodedToken)=>{
    if(err){
        console.log(err.message);
        return res.redirect('/login');
    }
    else{
        console.log(decodedToken);
        next();
    }
   })
    
}
app.get('/', async (req, res) => {
    try {
        res.render('index')
    }
    catch (error) {
        res.render('error', { error: error.message });

    }
})
// app.use((req,res,next)=>{
//     res.locals.user=user;
//     next();
// })
app.use('/destinations',verifyToken,destinationRoutes);
app.get('/login',userController.showLoginPage);
app.post('/login',userController.loginUser);
app.get('/signup',userController.showSignUpPage);
app.post('/signup',userController.signUpUser);
app.use('/rooms', verifyToken,roomRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
