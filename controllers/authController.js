import { comparePassword, hashPassword } from '../helpers/authHelpers.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';
import orderModel from '../models/orderModel.js';

const registerController = async(req,res) => {
 try{
   const {name,email,password,phone,address,answer} = req.body;
   //validations
   if(!name){ return res.send({message: 'Name is required'}); }
   else if(!email){ return res.send({message: 'Email is required'}); }
   else if(!password){ return res.send({message: 'Password is required'}); }
   else if(!phone){ return res.send({message: 'Phone is required'}); }
   else  if(!address){ return res.send({message: 'Address is required'}); }
   else  if(!answer){ return res.send({message: 'Answer is required'}); }

   //is this an exiting user
   const existingUser = await userModel.findOne({email});
   if(existingUser){ 
    return res.status(200).send({success:false, mesage:'User already exists.Please login!'});
   } 
 
   //register user
   const hashedPassword = await hashPassword(password);

   //save new user
   const user  = await  userModel({name,email,password:hashedPassword,phone,address,answer}).save();
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
        address: user.address,
        role: user.role
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



const updateProfileController = async(req,res) => {
  try{
    const {email,name,phone,address,password} = req.body;
    const user = await userModel.findById(req.user._id);
    if(!password || password.length<6){
      return res.json({error: "Password of 6 chars minimum is required"});
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
      name: name || user.name,
      password: hashedPassword || user.password,
      phone: phone || user.password,
      address: address || user.address
    }, {new:true});
    res.status(201).send({success:true, message: 'Profile update successful', updatedUser});
  }catch(error){
    console.log("eeeeeeeeeee=" + error);
    res.status(500).send({success:false, message:"Error in updateProfileController()", error});
  }
}


const getOrdersController = async(req,res) => {
  try{
    const orders = await orderModel.find({buyer:req.user._id})/*.populate("products", "-photo").populate("buyer","name")*/;
    res.json(orders);
  }catch(error){
    console.log("eeeeeeeeeeee=" + error);
    res.status(500).send({success:false, message:'Error in getOrdersController()', error});
  }
}


const getAllOrdersController = async(req,res) => {
  try{
    const orders = await orderModel.find({})./*populate("products", "-photo").populate("buyer","name").*/sort({createdAt:"-1"})/*.populate("products", "-photo").populate("buyer","name")*/;
    res.json(orders);
  }catch(error){
    console.log("eeeeeeeeeeee=" + error);
    res.status(500).send({success:false, message:'Error in getAllOrdersController()', error});
  }
}


//order status
const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};


export {registerController, loginController,testController,forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController,orderStatusController}