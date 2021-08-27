const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.login = (req,res,next) =>{
    const {email,password} = req.body;
    if( !email || !password){
        res.status(404).send({message:'please enter email and password'})
    }
    User.findOne({email:email})
    .then(user =>{
        if(!user){
            return res.status(202).send({message:'Invalid Email'})
        }
        bcrypt.compare(password,user.password)
        .then(doMatch =>{
             if(doMatch){
                 let userResult = {
                     userId:user._id,
                    userType:user.userType   
                 }
                 return res.status(200).send({message:userResult})
             }
             res.status(304).send({message:'something went wrong'})
        })
        .catch(err =>{
            console.log(err);
        })
    })

.catch(err =>{
    console.log(err);
})}

exports.signup = (req,res,next) =>{
    const {name,email,password} = req.body
   if(!name || !email || !password){
       res.status(400).send({message:'All fields are required'})
   }
   User.findOne({email:email})
   .then(user =>{
       if(user) {
           console.log('email already exist!');
       }
       bcrypt.hash(password,12)
       .then(password =>{
        const users = new User({
            email:email,
            name:name,
            password:password
        })
        users.save()
        .then(result =>{
            console.log(result);
        })
       })
        
       
       .catch(err =>{
           console.log(err);
       })
      
   })
   .catch(err =>{
       console.log(err);
   })
}

exports.sendResetPasswordLink = (req,res,next) =>{
    const email = req.body.email;
  crypto.randomBytes(32,(err ,buffer) =>{
      if(err){
          console.log(err);
      }
      const token = buffer.toString('hex')
      User.findOne({email})
      .then(user =>{
          if(!user){
              res.send({message:'no email found '})
          }
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save()
      })
      .then(result =>{
          res.send({message:result})
      })
      .catch(err =>{
          console.log(err);
      })
  });

}

exports.resetPassword =(req,res,next) =>{
      const token = req.body.token;
      const password = req.body.password;
      let userToReset;
      User.findOne({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
      .then(user =>{
          if(!user){
              res.send({message:'invalid token'})
          }
          userToReset = user;
          return bcrypt.hash(password,12)
          })
          .then(hashedPassword =>{
            userToReset.password = hashedPassword;
            userToReset.resetToken = undefined;
            userToReset.resetTokenExpiration = undefined
            return userToReset.save()
          .then(result =>{
              res.send({message:'reset password successfully!'})
          })
          .catch(err =>{
              console.log(err);
          })
      })
      .catch(err =>{
          console.log(err);
      })
}

// exports.sendResetPasswordLink = (req,res,next) =>{
//     crypto.randomBytes(32,(err,buffer) =>{
//         if(err){
//             res.send({message:err})
//         }
//         const token = buffer.toString('hex')
//         User.findOne({email:email})
//         .then(user =>{
//             if(!user){
//                 res.send({message:'no email found'})
//             }
//             const resetToken = token;
//             const resetTokenExpiration = Date.now() + 360000;
//             return user.save()
//         }).then(result =>{
//             res.send({message:'reset password link sent successfully'})
//         })
//         .catch(err =>{console.log(err);})
//     })
// }

// exports.resetPassword = (req,res,next) =>{
//     const token = req.body.token;
//     const password = req.body.password;
//     let resetUser;
//     User.findOne({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
//     .then(user =>{
//         if(!user){
//             res.send({message:'invalid token'})
//         }
//         resetUser = user;
//         bcrypt.hash(password,12)
//         .then(hashedPassword =>{
//             resetUser.password = hashedPassword;
//             resetUser.resetToken = undefined;
//             resetUser.resetTokenExpiration = undefined;
//             return resetUser.save()
//         }).then(result =>{
//             res.send({message:'password reset successfully'})
//         })
//         .catch(err =>{
//             console.log(err);
//         })
//     })
//     .catch(err =>{
//         console.log(err);
//     })
// }