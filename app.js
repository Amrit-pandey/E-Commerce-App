const express = require('express');
const bodyParser = require('body-parser')
 const mongoose  = require('mongoose');
//  const mongoClient = require('mongodb').mongoClient;

const app = express();



// routes

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth')
const shopRoutes = require('./routes/shop')
const User = require('./models/user')

// middleware
app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())

app.use((req,res,next) =>{
    let userid = req.body.userid;
    if(!userid){
        return next()
    }
    User.findById(userid)
    .then(user =>{
        req.user = user;
        next()
    })
    .catch(err =>{console.log(err);})
})


app.use('/admin',adminRoutes);
app.use(authRoutes)
app.use(shopRoutes)

mongoose.connect('mongodb+srv://max:t5p39HNcEHIuGioV@cluster0.dcvun.mongodb.net/Shop?retryWrites=true&w=majority',
{useUnifiedTopology:true,useNewUrlParser:true})
.then(result =>{
    console.log('connected');
    app.listen(8080)
})
.catch(err =>{
    console.log(err)
})


// t5p39HNcEHIuGioV