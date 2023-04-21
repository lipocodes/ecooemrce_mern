import React from 'react'
import {NavLink, Link} from 'react-router-dom';
import {GiShoppingCart}  from 'react-icons/gi';
import {useAuth} from '../../context/auth';
import {toast} from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import Dropdown from './Dropdown';
import {useCart} from '../../context/cart';
import {Badge} from 'antd'; 

const Header = () => {

 const [auth,setAuth] = useAuth();
 const categories = useCategory();
 const [cart, setCart] = useCart();

 const handleLogout = (e) =>{
   setAuth({
    ...auth,
    user:null,
    token:""
   });
   localStorage.removeItem("auth");
   toast.success('Logged out successfully!');
 }

  return (
    <>    
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <center>
        <div class="row">

          <div className='col-md-3' style={{maxWidth:"250px"}} >
            <GiShoppingCart style={{marginLeft:"0.5rem"}}/>
            <Link  to="/" className="navbar-brand">Ecommerce App</Link>  
          </div>

          <div className='col-md-1'>
            <Badge count={cart?.length ? cart.length:"0"} showZero>
              <NavLink to="/cart" className="nav-link" href="#">Cart </NavLink>
            </Badge>  
          </div>
      
          <div className='col-md-1' style={{width:"250px"}} >
            <SearchInput/>
          </div>
        
          <div className='col-md-1 h6' >
            <NavLink to="/" className="nav-link">Home <span className="sr-only">(current)</span></NavLink>  
          </div>

          <div className='col-md-1 h6'>
            <NavLink to="/register" className="nav-link" href="#">Register</NavLink>
          </div>

          <div className='col-md-1 h6'>
            <NavLink to="/login" className="nav-link" href="#">Login</NavLink>
          </div>

          <div className='col-md-1 h6'>
            <NavLink  to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`} className="nav-link" >Dashboard</NavLink>  
          </div>

    

          <div className='col-md-3'>
            <Dropdown categories={categories}/>
          </div>
          
        </div>
        </center>
      </nav>
    </>

  )
}

export default Header