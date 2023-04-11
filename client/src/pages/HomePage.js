import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import {Link} from "react-router-dom";
import {Checkbox, Radio} from 'antd';
import { Prices } from '../components/Prices';

const HomePage = () => {

const [products,setProducts] = useState([]);
const [categories,setCategories] = useState([]);
const [checked,setChecked] = useState([]);
const [radio,setRadio] = useState([]);
const [total, setTotal] = useState(0);
const [page,setPage] = useState(1);
const [loading, setLoading] =useState(false);
const navigate  = useNavigate();

const getTotal = async() =>{
  try{
    const {data} = await axios.get("/api/v1/product/product-count");
    if(data.success){
      toast.success("Total products are ${total}");
      setTotal(data?.total);
    }else{
      toast.error("Can't show total products");
    }
   
  }catch(error){
    toast.error("Can't show total products");
    console.log("eeeeeeeeeeee="  +error);
  }
}

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

const getAllProducts = async()=>{
  try{
    setLoading(true);
    const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    toast.success("Product retreived");
    setProducts(data.products);
  }catch(error){
    setLoading(false);
    console.log("eeeeeeeeeee=" + error);
    toast.error("Something went wrong");
  }
}


const handleFilter = async(value,id)=>{
  try{  
     let all = [...checked];
     if(value===true){
      all.push(id);
     }else{
      all = all.filter(c => c!==id);
     }
     
     setChecked(all);
  }catch(error){
   console.log("eeeeeeeeeeeee=" + error);
   toast.error("Something went wrong"); 
  }
}


const filterProduct = async()=>{
  try{
    const {data}  = await axios.post("/api/v1/product/product-filter", {checked,radio});
    if(data?.success){
      setProducts(data?.products);
    }else{
      toast.error("Something went wrong..");
    }
  }catch(error){
    console.log("eeeeeeeeeeee=" + error);
    toast.error("Something went wrong..");
  }
}

const loadMore = async()=>{
  try{
    setLoading(true);
    const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    if(data.success){
      setProducts([...products, ...data?.products]);
      toast.success("Load more successful..");
    }else{
      toast.error("Can't load more..");
    }
  }catch(error){
    setLoading(false);
    console.log("eeeeeeeeeeee=" + error);
    toast.error("Can't load more..");
  }
}


useEffect(()=>{
 if(page===1) return;  
 loadMore();
},[page]);


useEffect(()=>{
  getAllCategory();
  getTotal();
},[]);



useEffect(()=>{
 if(checked.length || radio.length) filterProduct();
 else getAllProducts();
}, [checked,radio]);



  return (
    <Layout title={"All Products - Best Offers"}>
       <div className='row mt-3'>
        <div className='col-md-2 m-2'>
          <h4 className='text-center'>Filter by Category</h4>
          <div className='d-flex flex-column'>
            {categories?.map((c)=>(
              <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked, c._id)}> 
               {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className='text-center mt-4'>Filter by Price</h4>
          <div className='d-flex flex-column m-2'>
          <Radio.Group onChange={e=>setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
               
              ))}
            </Radio.Group>
            <button className='btn btn-danger mt-3' onClick={()=>window.location.reload()}>RESET FILTERS</button>
          </div>
     
        </div>
        <div className='col-md-9'>
          {JSON.stringify(radio,null,4)}
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products?.map((p)=> (
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
          <div className='m-2 p-3'>
            {/* if this page holds only part of products  */}
            {products && products.length < total && (
              <button className='btn btn-warning' onClick={(e)=>{
                e.preventDefault();
                setPage(page+1);
              }}>
                {loading? "Loading..." :  "Load More"}
              </button>
            ) }
          </div>
        </div>
       </div>
    </Layout>
   
  )
}

export default HomePage