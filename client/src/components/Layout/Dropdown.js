import React from 'react'
import {useNavigate} from 'react-router-dom';

const Dropdown = ({categories}) => {
    const navigate  = useNavigate();

  return (
    <div>
      <select onChange={(e)=>navigate(`/categories/${e.target.value}`)} className='ms-2 mt-2'  style={{backgroundColor: "transparent", border:"none"}}>
      <option value="" disabled selected>CATEGORY</option>
      { categories.map((c)=>(
        <option  key={c._id} value={c.name}>{c.name.toUpperCase()}</option>
      ))  }
        
      </select>
    
    </div>
  )
}

export default Dropdown