const mongoose = require('mongoose');


const signupSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,

})


const signupRecord = new mongoose.model("signupRecord", signupSchema);

module.exports=signupRecord;