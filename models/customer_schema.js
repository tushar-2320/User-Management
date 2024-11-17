const mongoose=require('mongoose');
const Schema= new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:true,
    }
    ,
    lastName: 
    {
        type:String,
        required:true,
        trim:true,}
    ,
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    company:{
        type:String,
        required:true,
        trim:true,
    },
    jobTitle:{
        type:String,
        required:true,
        trim:true,
    },

});
const Customer=mongoose.model('Customer',Schema);
module.exports=Customer;