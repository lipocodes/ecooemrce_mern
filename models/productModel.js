import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name:{
    type: String,
    require:true,
    uniquie:true
  },
  slug:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type: Number,
    required:true
  },
  category:{
    type: mongoose.ObjectId,
    ref: 'category',
    require:true
  },
  quantity:{
    type: Number,
    required:true
  },
  photo:{
    data: Buffer,
    contentType: String
  },
  shipping:{
    type:Boolean,
  }
},{timestamps:true});

export default mongoose.model('Product',productSchema, "product");  