import { comparePassword, hashPassword } from '../helpers/authHelpers.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';


const registerController = async(req,res) => {
 try{
   const {name,email,password,phone,address} = req.body;
   //validations
   if(!name){ return res.send({message: 'Name is required'}); }
   else if(!email){ return res.send({message: 'Email is required'}); }
   else if(!password){ return res.send({message: 'Password is required'}); }
   else if(!phone){ return res.send({message: 'Phone is required'}); }
   else  if(!address){ return res.send({message: 'Address is required'}); }

   //is this an exiting user
   const existingUser = await userModel.findOne({email});
   if(existingUser){ 
    return res.status(200).send({success:false, mesage:'User already exists.Please login!'});
   } 

   //register user
   const hashedPassword = await hashPassword(password);
   //save new user
   const user  = await  userModel({name,email,password:hashedPassword,phone,address}).save();
   res.status(201).send({success:true, message:'New user created!', data:user});

 }catch(error){
   console.log("Error in registerController()");
   res.status(500).send({success:false, message: 'Error in registerController()', error}); 
 }
  
}



const loginController = async(req,res) => {
    try{
      const {email,password} = req.body;
      //validation
      if(!email || !password){
        return res.status(404).send({success:false, message: "Invalid email or password"});
      }
      //check user
      const user = await userModel.findOne({email});
      if(!user){
        return res.status(404).send({success:false, message: 'Email not registered'});
      }
      const match = await comparePassword(password, user.password);
      //validate password
      if(!match){
        return res.status(200).send({success:false, message: 'Invalid password'});
      }

      //token
      const token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
      res.status(200).send({success:true, message:'Login successful', user:{
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      },
      token
    });
      
      
    }catch(error){
       res.status(500).send({success:false, message: 'Error in loginController()', error}); 
    }
}


const forgotPasswordController = async(req,res)=>{
  try{
    const {email,answer, newPassword} = req.body;
    if(!email){
      res.status(400).send({message:'Email is required'});
    }
    else if(!answer){
      res.status(400).send({message:'Answer is required'});
    }
    else if(!newPassword){
      res.status(400).send({message:'New password is required'});
    }
    //check
    const user = await userModel.findOne({email,answer});
    //validate
    if(!user){
      return res.status(404).send({success:false, message: 'Wrong email or answer'});
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {password:hashed});
    res.status(201).send({success:true,message: 'Password reset successful'});
  }catch(error){
    console.log("eeeeeeeeeeeeee=" + error);
    res.status(500).send({success:false, message: 'Something went wrong', error});
  }
}






const testController = async(req,res) => {
 try{
  res.status(200).send({success:true});
 }catch(error){
  console.log("eeeeeeeeeeeeeeee=" + error);
  res.status(500).send({success:false, message: 'Error in testController()', error});
 }
}

export {registerController, loginController,testController,forgotPasswordController}