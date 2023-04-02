import React, {useState} from 'react'
import Layout from "../../components/Layout/Layout";
import { toast} from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {
const navigate = useNavigate();
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
const [address,setAddress] = useState("");


const handleSubmit = async(e)=>{
 e.preventDefault();

 try{
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, 
    {name,email,password,phone,address});
    if(res.data.success){
      toast.success(res.data.message);
      navigate('/login');
    }else{
        toast.error(res.data.message);  
    }
 }catch(error){
    console.log("eeeeeeeeee=" + error);
    toast.error("Something went wrong..");
  }

  // toast.success("Register successful!");
}

  return (
    <Layout title={"Register"}>
      <div className='register'>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputName" placeholder="Name.." required />
          </div>

          <div className="mb-3">
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail" placeholder='Email..'  required/>
          </div>

          <div className="mb-3"> 
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder='Password..' required />
          </div>

          <div className="mb-3">
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" className="form-control" id="exampleInputPhone" placeholder='Phone' required />
          </div>

          <div className="mb-3">
            <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control" id="exampleInputAddress" placeholder='Address..' required />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>  
    </Layout>
  )
}

export default Register