import React from 'react'
import {NavLink, Link} from 'react-router-dom';
import {GiShoppingCart}  from 'react-icons/gi';
import {useAuth} from '../../context/auth';
import {toast} from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import Dropdown from './Dropdown';

const Header = () => {

 const [auth,setAuth] = useAuth();
 const categories = useCategory();


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
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <GiShoppingCart style={{marginLeft:"0.5rem"}}/>
    <Link  to="/" className="navbar-brand">Ecommerce App</Link>
    <ul className="navbar-nav ms-auto mb-2 mt-lg-0">
      <SearchInput/>
      <li className="nav-item">
        <NavLink to="/" className="nav-link">Home <span className="sr-only">(current)</span></NavLink>
      </li>

      <li className="nav-item">
        <Dropdown categories={categories}/>
      </li>
      
      { !auth.user? (<>
        <li className="nav-item">
        <NavLink to="/register" className="nav-link" href="#">Register</NavLink>
      </li>

      
      <li className="nav-item">
        <NavLink to="/login" className="nav-link" href="#">Login</NavLink>
      </li> 
      </>) : 
      (<>  
      
       <li className="nav-item">
        <NavLink  to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`} className="nav-link" >Dashboard</NavLink>
      </li>    
       <li className="nav-item">
        <NavLink  onClick={handleLogout} to="/login" className="nav-link" href="#">Logout</NavLink>
      </li> 
      </>)}
      <li className="nav-item">
        <NavLink to="/cart" className="nav-link" href="#">Cart(0)</NavLink>
      </li>

    </ul>
  </div>
</nav>
 
       
    </>
  )
}

export default Header