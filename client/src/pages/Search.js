import Layout  from '../components/Layout/Layout.js'
import React from 'react'
import {useSearch} from '../context/search';
import {Link} from "react-router-dom";

const Search = () => {
  const [values,setValues] = useSearch();
  return (
    <Layout title={'Search Results'}>
      <div className='container'>
        <div className='text-center'>
          <h1>Search Results</h1>
          <h6>{values?.results.results.length<1?'No products found': `Found ${values?.results.results.length} products`}</h6>
          
          <div className='d-flex flex-wrap mt-4'>
            {values?.results.results.map((p)=> (
               <Link  className='product-link' key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                 <div className="card m-2" style={{width: '18rem', }} >
                 <img className="card-img-top" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                 <div className="card-body">
                   <h5 className="card-title">{p.name}</h5>
                   <p className="card-text">{p.description.substring(0,30)}...</p>
                   <p className="card-text"> $ {p.price}</p>
                   <button className='btn btn-primary ms-1'>More Details</button>
                   <button className='btn btn-secondary ms-1'>ADD TO CART</button>
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

export default Search