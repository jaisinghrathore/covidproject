const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/manyDatas",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection ho gaya abb");
})