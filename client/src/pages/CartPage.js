import React from 'react'
import Layout from '../components/Layout/Layout';
import {useCart}  from '../context/cart';
import {useAuth} from '../context/auth';
import {useNavigate} from 'react-router-dom';

const CartPage = () => {
  const [auth,setAuth] = useAuth();
  const [cart,setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = ()=>{
    try{
      let total = 0;
      cart?.map((item)=>{
        total += item.price;
    });
    return total.toLocaleString("en-us", {
      style: "currency",
      currency: "USD"
    }) ;
    }catch(error){
      console.log("eeeeeeeeeeee=" + error);
    }
  }

  const removeCartItem = (pid)=>{
    try{
      let myCart = [...cart];
      let index = myCart.findIndex((item)=>item._id===pid);
      myCart.splice(index,1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    }catch(error){
      console.log("eeeeeeeeeeeeeeee=" + error);
    }
  }

  return (
    <Layout title={`Cart`}>
      <div className='container'>
        <div className='row'>
          <h1>Your Cart</h1>
          <div className='col-md-12'> 
            <h1 className='text-center bg-light p-2 mb-1'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : " please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            <div className='row'>
              {cart.map((c)=>(
                <div className='row m-2 card p-4 flex-row'>
                  <div className='col-md-4'>
                    <img className="card-img-top" src={`/api/v1/product/product-photo/${c._id}`} alt={c.name} width="100px" height="100px" />
                  </div>
                  <div className='col-md-8'>
                    <p>{c.name}</p>
                    <p>{c.description.substring(0,30)}</p>
                    <p>price: ${c.price}</p>
                    <button className='btn btn-danger'onClick={()=>removeCartItem(c._id)} >Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className='col-md-4 text-center'>
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr/>
            <h4>Total: {totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage