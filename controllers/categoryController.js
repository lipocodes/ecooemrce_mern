
import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';

export const createCategoryController = async(req,res) =>{
  try{
    const {name,slug} = req.body;
    if(!name){
    return res.status(401).send({success:false, message: 'Name is required!'});
    }
    const existingCategory = await categoryModel.findOne({name});
    if(existingCategory){
      return res.status(200).send({success:true, message: 'Category already exists!'});   
    }
    const category = await new categoryModel({name, slug: slugify(name)}).save();
    res.status(201).send({success:true, message: 'Category added!', category});
  }catch(error){
    console.log("eeeeeeeeeeee=" + error);
    res.status(500).send({success:false, message: 'Error while creating category', error});
  }
}


export const updateCategoryController = async(req,res) =>{
  try{
    const {name} = req.body;
    const {id} = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new:true});
    res.status(201).send({success:true, message: 'Category update successful', category});
  }catch(error){
    console.log("eeeeeeeeeeeee=" + error);
    res.status(500).send({success:false, message: 'Error while updating category', error});
  }
}


export const categoryController = async(req,res) =>{
  try{
    const category = await categoryModel.find({});
    res.status(200).send({success:true,message:'Retreived categories successfully', category});
  }catch(error){
    console.log("eeeeeeeeeeeeee=" + error);
    res.status(500).send({success:false, message:"Can't get categories", error});
  }
}



export const singleCategoryController = async(req,res)=>{
  try{
    const {slug} = req.params;
     const category = await categoryModel.findOne({slug:req.params.slug});
     res.status(200).send({success:true, message:'Retreived category successfully', category});
  }catch(error){
    console.log("eeeeeeeeeeeeeee=" + error);
    res.status(500).send({success:false, message: "Can't get this category", error});
  }
}


export const deleteCategoryController = async(req,res)=>{
  try{
   const category  = await categoryModel.findByIdAndDelete(req.params.id);
   res.status(201).send({success:true,message:'Deleted category successfully', category});
  }catch(error){
    console.log("eeeeeeeeeeee=" + error);
    res.status(500).send({success:false, message:"Can't delete this category"});
  }
}