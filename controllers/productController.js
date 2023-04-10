import productModel from '../models/productModel.js';
import fs from 'fs';
import slugify from 'slugify';

export const createProductController = async(req,res)=>{
 try{
    //another way of  reading req transmittined by the fronthend
    const {name,slug, description, price, category, quantity} = req.fields;
    const {photo} = req.files;
    //validation
    if(!name){
      return res.status(400).send({error:"Name is required"});  
    }
    else if(!description){
        return res.status(400).send({error:"Description is required"});  
    }
    else if(!price){
        return res.status(400).send({error:"Price is required"});  
    }
    else if(!category){
        return res.status(400).send({error:"Category is required"});  
    }
    else if(!quantity){
        return res.status(400).send({error:"Quantity is required"});  
    }
    else if(photo && photo.size>1000000){
        return res.status(400).send({error:"Photo should be less than 1MB"});  
    }
     
    const product  = new productModel({...req.fields, slug: slugify(name)});
    if(photo){
       product.photo.data = fs.readFileSync(photo.path);
       product.photo.contentType = photo.type;  
    }
    await product.save();
    res.status(201).send({success:true, message:'Product added successfully', product});
 }catch(error){
   console.log("eeeeeeeeeeeeeee=" + error);
   res.status(500).send({success:false, message:"Can't create this product", error}); 
 }
}


export const updateProductController = async(req,res)=>{ 
    try{
        //another way of  reading req transmittined by the fronthend
        const {name,slug, description, price, category, quantity} = req.fields;
        const {photo} = req.files;
        //validation
        if(!name){
          return res.status(400).send({error:"Name is required"});  
        }
        else if(!description){
            return res.status(400).send({error:"Description is required"});  
        }
        else if(!price){
            return res.status(400).send({error:"Price is required"});  
        }
        else if(!category){
            return res.status(400).send({error:"Category is required"});  
        }
        else if(!quantity){
            return res.status(400).send({error:"Quantity is required"});  
        }
        else if(photo && photo.size>1000000){
            return res.status(400).send({error:"Photo should be less than 1MB"});  
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug:slugify(name)}, {new:true});
        res.status(201).send({success:true, message:'Product updated successfully', product});
     }catch(error){
       console.log("eeeeeeeeeeeeeee=" + error);
       res.status(500).send({success:false, message:"Can't update this product", error}); 
     }
}


export const getProductsController = async(req,res)=>{
 try{
   const products = await productModel.find({});
   res.status(200).send({success:true, message:'Products retreived successfully', products, counTotal:products.length});
  }catch(error) {
    console.log("eeeeeeeeeeeeeee=" + error);
    res.status(500).send({success:false, mesage: "Can't get products", error});
  }
}

export const getSingleProductController = async(req,res)=>{
  try{
    const {slug} =  req.params;
    //const product = await productModel.findOne({slug}).select("-photo").populate("category");
    const product = await productModel.findOne({slug});
    res.status(200).send({success:true, message:"Product retreived", product});
  }catch(error){
    console.log("eeeeeeeeeeeeeeeee=" + error);
    res.status(500).send({success:false, message: "Can't get this product", error});
  }  
}


export const productPhotoController = async(req,res)=>{
    try{
      const {pid} = req.params;
      const product = await productModel.findById(pid).select("photo");
      if(product.photo.data){
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
      
    }catch(error){
       console.log("eeeeeeeeeeeeee=" + error);
       res.status(500).send({success:true, message:"Can't get photo", error}); 
    }
}



export const deleteProductController = async(req,res)=>{
    try{
      const {pid} = req.params;
      await productModel.findByIdAndDelete(pid).select("-photo");
      res.status(201).send({success:true, message:"Product deleted"});
    }catch(error){
        console.log("eeeeeeeeeeee=" + error);
        res.status(500).send({success:false, message: "Can't delete product"});
    }
}



export const productFilterController = async(req,res)=>{
  try{
   const {checked,radio} = req.body;
   let args = {};
   if(checked.length>0){
    args.category = checked;
   }
   if(radio.length){
    args.price = {$gte:radio[0], $lte:radio[1]}
   }
   const products = await productModel.find(args);
   res.status(200).send({success:true, message:'products retreived', products});
  }catch(error){
    console.log("eeeeeeeeeeeee=" + error);
    res.status(400).send({success:false, message:'Error in filtering products', error}); 
  }
}


export const productCountController = async(req,res)=>{
  try{
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({success:true, message:'products counted', total});
  }catch(error){
    console.log("eeeeeeeeeeeeee="  +error);
    res.status(400).send({success:false, message:"Error in counting products", error});
  }
}


export const productListController = async(req,res)=>{
  try{
    const perPage = 2;
    const page = req.params.page  ? req.params.page : 1;
    const products = await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt: -1}) ; 
    res.status(200).send({success:true, message:'Per page successful', products});
  }catch(error){
    console.log("eeeeeeeeeeeeeee=" + error);
    res.status(400).send({success:false, message:"Error in per page controller", error});
  }
}