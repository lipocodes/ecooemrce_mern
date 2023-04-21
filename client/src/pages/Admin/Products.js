import React, {useState, useEffect} from 'react'
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from '../../components/Layout/Layout.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Link}  from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
  const getAllProducts = async() =>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`);
      if(data.success){
        toast.success("Product list retreived");
        setProducts(data.products);
      }
    }catch(error){
     console.log("eeeeeeeeeeeee=" + error);
     toast.error("Something went qwrong with retreiving product list");
    }
  }

  useEffect(()=>{
    getAllProducts();
  },[]);

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9 mt-3'>
          <h1 className='text-center'>All Products List</h1>
          <div className='d-flex flex-wrap' style={{margin:"20px"}}>
            {products?.map((p)=> (
             <Link  className='product-link' key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
               <div className="card m-2" style={{width: '18rem', }} >
               <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
               <div className="card-body">
                 <h5 className="card-title">{p.name}</h5>
                 <p className="card-text">{p.description}</p>
               </div>
               </div>
             </Link>   
             
          ))}
          </div>
    
        </div>  
      </div>    
    </Layout>
  )
}

export default Products
