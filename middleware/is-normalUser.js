const User = require('../models/user');

module.exports = (req,res,next) =>{
    const userid = req.body.userid;
    if(!userid){
        return res.send({message:'please send user id'})
    }
    User.findById(userid)
    .then(user =>{
        if(!user){
            return res.send({message:'invalid user id'})
        }
        const userType = user.userType
        if(userType !== 2){
            return res.send({message:'not an normal user'})
        }
    })
    .catch(err =>{
        console.log(err);
    })
}