import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const ProductDetails = () => {

const [product, setProduct] = useState({});
const [relatedProducts, setRelatedProducts] =  useState([]);
const params = useParams();
const navigate  = useNavigate();
 
 const getProduct = async()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category);
    }catch(error){
      console.log("eeeeeeeeeeee=" + error);  
    }
 }
 

const getSimilarProducts = async(pid,cid)=>{
  
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    }catch(error){
     console.log("eeeeeeeeeeeeeeee=" + error);
    }
}

 useEffect(()=>{
    if(params?.slug) getProduct();
 }, []);



  return (
    <Layout>
      
      <div className='row container mt-2'>
        <div className='col-md-6'>
          <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} alt={product.name} height="300" width="350px"/>    
        </div>
        <div className='col-md-6'>
          <h1  className='text-center'>Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price:$ {product.price}</h6>
          <button className='btn btn-secondary ms-1'>ADD TO CART</button>         
        </div>
      </div>

      <hr/>

      <div className='row container'>
        <h6>Similar Products</h6>
        {relatedProducts.length<1 && <p className='text-center'>No similar products</p>}
        <div className='d-flex flex-wrap'>
            {relatedProducts?.map((p)=> (
                 <div className="card m-2" style={{width: '18rem', }} >
                 <img className="card-img-top" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                 <div className="card-body">
                   <h5 className="card-title">{p.name}</h5>
                   <p className="card-text">{p.description.substring(0,30)}...</p>
                   <p className="card-text"> $ {p.price}</p>
                   <button className='btn btn-primary ms-1' onClick={(e)=>navigate(`/product/${p.slug}`)} >More Details</button>
                   <button className='btn btn-secondary ms-1'>ADD TO CART</button>
                 </div>
                 </div>
          ))}
          </div>
      </div> 

    </Layout>
  )
}

export default ProductDetails