const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const she= mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    gender:{
        type:String,
    },
    phone:{
        type:Number,
        unique:true
    },
    age:{
        type:Number,
        min:1
    },
    password:{
        type:String,
    },
    confirmpassword:{
        type:String,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


//generating tokens;

she.methods.generateTokens= async function(){

    try{
    
    const token= jwt.sign({_id:this._id.toString()},"mynameisvinayakpokhernaismynamediamsigoodinfjfsdhjih");
    
    this.tokens=this.tokens.concat({token:token});    
    await this.save();
    return token;
    }catch(err){
        console.log(err);
    }
    
    }


//bcrypt
she.pre("save", async function(next){
        if(this.isModified("password")){
            this.password=await bcrypt.hash(this.password,10)
            this.confirmpassword=await bcrypt.hash(this.password,10)
        }
        next();
})


//making models
const Register = mongoose.model("Register",she);
module.exports=Register;