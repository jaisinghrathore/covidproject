const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/hackathon", {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connection ho gayya");
}).catch((e)=>{
    console.log("error");
})