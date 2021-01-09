const express = require('express');
require('./connection');
const Basicinfo = require('./usermessage');
var cookieParser = require('cookie-parser')
const Register = require("./regis");
const Emergency = require("./schee");
const bcrypt = require('bcryptjs');
const app= express();
var requests = require('requests');
const hbs = require('hbs');
app.set("view engine","hbs");
hbs.registerPartials("./views");



app.use(cookieParser());







app.use(express.urlencoded({extended:false}));





// upper nav 

app.get("/datas",(req,res)=>{
        //request
 requests('https://api.covid19api.com/summary')
 .on('data', function (chunk) {
var obj=JSON.parse(chunk);
var arr=[obj];
res.render("datas",{
    confirmed:arr[0].Global.TotalConfirmed,
    });
 })
 .on('end', function (err) {
 if (err) return console.log('connection closed due to errors', err);
 });
 //end
    
});



//login
app.get("/login",(req,res)=>{
    res.render("login");
});


//registeration
app.get("/register",(req,res)=>{
    res.render("register");
});



// lower nav bar






//home
app.get("/",(req,res)=>{
      //request
 requests('https://api.covid19api.com/summary')
 .on('data', function (chunk) {
var obj=JSON.parse(chunk);
var arr=[obj];
res.render("frontPage",{
    confirmed:arr[0].Global.TotalConfirmed,
    });
 })
 .on('end', function (err) {
 if (err) return console.log('connection closed due to errors', err);
 });
 //end
});



//details
app.get("/details",(req,res)=>{
     //request
 requests('https://api.covid19api.com/summary')
 .on('data', function (chunk) {
var obj=JSON.parse(chunk);
var arr=[obj];
res.render("covidInfo",{
    confirmed:arr[0].Global.TotalConfirmed,
    });
 })
 .on('end', function (err) {
 if (err) return console.log('connection closed due to errors', err);
 });
 //end
    
});





//this is about ka page
app.get("/about",(req,res)=>{
   //request
 requests('https://api.covid19api.com/summary')
 .on('data', function (chunk) {
var obj=JSON.parse(chunk);
var arr=[obj];
res.render("about",{
    confirmed:arr[0].Global.TotalConfirmed,
    death:arr[0].Global.TotalDeaths,
    Recoveres:arr[0].Global.TotalRecovered
    });
 })
 .on('end', function (err) {
 if (err) return console.log('connection closed due to errors', err);
 });
 //end
});
//ending of this page.


//contact
app.get("/contact",(req,res)=>{
      //request
 requests('https://api.covid19api.com/summary')
 .on('data', function (chunk) {
var obj=JSON.parse(chunk);
var arr=[obj];
res.render("contact",{
    confirmed:arr[0].Global.TotalConfirmed
    });
 })
 .on('end', function (err) {
 if (err) return console.log('connection closed due to errors', err);
 });
 //endv
});


//error

app.get("*",(req,res)=>{
    res.status(404).render("error");

});


//some post methods

app.post("/", async (req,res)=>{

    try{
 
        
        const messages = new Basicinfo({
            name : req.body.name,
            number : req.body.number,
            email : req.body.email,
            message : req.body.message
        })

        const save= await messages.save();
        res.status(201).render("frontPage.hbs");

    }catch(err){
        res.status(400).send("This information already exist");
    }


})


app.post("/contact", async (req,res)=>{

    try{
 
        
        const messages = new Basicinfo({
            name : req.body.name,
            number : req.body.number,
            email : req.body.email,
            message : req.body.message
        })

        const save= await messages.save();
        res.status(201).render("contact.hbs");

    }catch(err){
        res.status(400).send("This information already exist");
    }


})





app.post("/about", async (req,res)=>{

 
        try{
            const messages = new Emergency({
                nameone : req.body.nameone,
                numberone : req.body.numberone,
                emailone : req.body.emailone,
                symptoms : req.body.symptoms
            })
    
            const save= await messages.save();
            res.status(201).render("about.hbs");
        }catch(err){
            res.status(400).send("This information already exist");
        }
           


})


app.post("/register", async (req,res)=>{
    const password=req.body.password;
    const cpassword=req.body.confirmpassword;

            

    try{
        if(password === cpassword){


            var registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
            })



               //making tokens
               const token=await registerEmployee.generateTokens();
               //ending

                //saving tokens to the cookies
                res.cookie("jwt",token);
                //ending

            
        const save= await registerEmployee.save();
        res.status(201).render("frontPage.hbs");



    }else{
       res.send("password is not matching")
    }

    }catch(err){
        res.status(400).send(err);
    }

});




app.post("/login", async (req,res)=>{

    try{

    const email= req.body.email;
    const password= req.body.password;

    const usermail=await Register.findOne({email:email});
    const comp= await bcrypt.compare(password,usermail.password);

            //jwt vala
            const token=await usermail.generateTokens();
            //ending

             //cookie    
             res.cookie("jwt",token,{
                expires:new Date(Date.now() + 800000000),
            })

            //ending

    if(comp == true){
        res.status(201).render("frontPage");
         }else{
             res.send("Invalid login details");
        }
            
    }catch(we){
        res.status(400).send("invalid details");
    }

});












const del= async () =>{
    const dell=await Basicinfo.deleteMany({});
    console.log(dell);
}

//del()


app.listen(3000,()=>{
    console.log("your connection is successfull");
})