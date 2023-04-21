import React from 'react'
import {useSearch} from '../../context/search';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SearchInput = () => {
  const [values,setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
      setValues({...values,results:data});
      navigate('/search');
    }catch(error){
      console.log("Error in handleSubmit()=" + error);
    }
  } 

    return (
    <div>
     <form className="d-flex form-inline my-2 my-lg-0" onSubmit={handleSubmit} >
       <input  value={values.keyword} onChange={(e)=>setValues({...values, keyword:e.target.value})} className="form-control mr-sm-2" style={{maxHeight:"40px"}} type="search" placeholder="Search" aria-label="Search" />
       <button className="btn btn-outline-success my-1 mx-2 my-sm-0" style={{maxHeight:"50px"}} type="submit">Search</button>
     </form>
    </div>
  )
}

export default SearchInput