import React, {useEffect,useState} from 'react'
import Layout from '../components/Layout/Layout.js';
import useCategory from '../hooks/useCategory.js';
import {Link} from  'react-router-dom';

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title={'All Categories'}>
      <div className='container'>
        <div className='row'>
          {categories.map(c=>(
            <div  key={c.id} className='col-md-6 mt-5 mb-3 gx-3 gy-3'>
              <Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link>    
            </div>
          ))}  
          
          <div className='col-md-6'>
            
          </div>    
        </div>
      </div>
    </Layout>
  )
}

export default Categories