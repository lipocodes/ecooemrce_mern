import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from "axios";
import toast from 'react-hot-toast';
import {Select} from "antd";
import {useNavigate, useParams} from "react-router-dom";

const {Option} = Select; 

const UpdateProduct = () => {

    const [categories,setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [shipping,setShipping] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [id, setId] = useState("");
    const navigate  = useNavigate();
    const params = useParams();

    //get single product
    const getSingleProduct = async()=>{
      try{
        const {data} = await axios.get(`/api/v1/product/single-product/${params.slug}`);
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        //setPhoto(data.product.photo);
        const res = await axios.get(`/api/v1/category/single-category/kids`);
        setCategory(res.data.category.name);
      }catch(error){
        console.log("eeeeeeeeeee=" + error);
        toast.error("Something went wrong..");
      }
    }


    useEffect(()=>{
     getSingleProduct();
     //eslint-disable-next-line
    },[]);


    const getAllCategory = async(req,res)=>{
        try{
          const {data} = await axios.get("/api/v1/category/get-category");
          if(data?.success){
            setCategories(data?.category);
          }
        }catch(error){
          console.log("eeeeeeeeeee=" + error);
          toast.error("Can't show categories");
        }
      }
      
      const handleUpdate = async(e)=>{
        e.preventDefault();
        try{
          const productData = new FormData();
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("quantity", quantity);
          productData.append("photo", photo);
          productData.append("category", category);
          productData.append("shipping", shipping);
          const {data} = await axios.put(`/api/v1/product/update-product/${id}`, productData);
          if(data?.success){
            toast.success("Product updated");
            navigate(`/dashboard/admin/products`);
          }else{
            toast.error("Couldn't update this product");
          }
        }catch(error){
          console.log("eeeeeeeeeeeeee=" + error);
          toast.error("Couldn't create this product");
        }
      }


      const handleDelete = async()=>{
        try{
         let answer = window.prompt("Delete this product?");
         if(!answer) return;
         const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
         if(data.success){
            toast.success("Product deleted");
            navigate(`/dashboard/admin/products`);
         }else{
            toast.error("Couldn't delete this item");
         }
        }catch(error){
           console.log("eeeeeeeeeeeeee=" + error);
           toast.error("Something went wrong.."); 
        }
      }
      
      useEffect(()=>{
        getAllCategory();
       },[]);

  return (
    <Layout title={'Dashboard - Create Product'}>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu/>
        </div>
        <div className='col-md-9'>
          <h1>Update Product</h1>
          <div className="m-1 w-75">
            <Select 
            bordered={false} 
            placeholder="Select a category" 
            size="large" 
            showSearch 
            className = 'form-select mb-3'
            value={category.name}
            onChange={(value)=>setCategory(value)}
            >
            {categories?.map((c)=>(
              <Option  key={c._id} value={c._id}>{c.name}</Option>
            ))}
            </Select>

            <div classsName="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo? photo.name: "Upload Photo"} 
                <input type="file" name="photo" accept="image/*"  onChange={(e)=>setPhoto(e.target.files[0])}  hidden/>
              </label>   
            </div>

            <div className="mb-3">
              {photo? 
              (
                <div className="text-center">
                  <img src={URL.createObjectURL(photo)} alt="product-photo" height={'200px'}  className="img img-responsive"/>
                </div>
              )
              :
              (
                <div className="text-center">
                  <img src={`/api/v1/product/product-photo/${id}`} alt="product-photo" height={'200px'}  className="img img-responsive"/>
                </div>
              )            
            }
            </div> 

            <div className="mb-3">
              <input type="text" value={name} placeholder="Write a name" className="form-control"   onChange={(e)=>setName(e.target.value)} />
            </div>

            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div> 

             <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
             </div>

            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select"
                value={shipping?"Yes":"No"}
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>

            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
            </div> 

            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div> 


          </div>
        </div>
      </div>
    </div>
</Layout>
  )
}

export default UpdateProduct