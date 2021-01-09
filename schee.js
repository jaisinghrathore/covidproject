const mongoose = require('mongoose');
 

    const sche= mongoose.Schema({
        nameone:{
            type:String,
            required:true,
        },
       
        emailone:{
            type:String,
            required:true,
          
        },
        numberone:{
            type:Number,
            required:true,
        },
        symptoms:{
            type:String
        }
    })


    //now we need to make collection

    const Emergency=  mongoose.model("Emergency",sche);
    module.exports = Emergency;