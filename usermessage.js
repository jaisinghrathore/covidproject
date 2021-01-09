const mongoose = require('mongoose');
const validator = require('validator');
 

    const userSchema=mongoose.Schema({
        name:{
            type:String,
            required:true,
            minLength:3
        },
        number:{
            type:Number,
            required:true,
            minLength:3,
            unique:true
        },
        email:{
            type:String,
            required:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("invalid email id")
                }
            },
            unique:true
        },
        message:{
            type:String
        }
    })


    //now we need to make collection

    const Basicinfo= mongoose.model("Basicinfo",userSchema);
    module.exports = Basicinfo;