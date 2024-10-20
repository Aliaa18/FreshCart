import React, { useContext , useEffect ,useState } from "react";
import styles from './Navbar.module.css'
import { Link, useNavigate } from "react-router-dom";
import { UserToken } from "../../Context/UserToken";
import { CartContext } from "../../Context/CartContext";
import { wishContext } from "../../Context/WishlistContext";

export default function Navbar() {
  const [owner, setOwner] = useState(null)
  let navigate=useNavigate();
  let{userToken} = useContext(UserToken);
  let{setUserToken}=useContext(UserToken);
 let{numOfCartItems , getUserCart } = useContext(CartContext)
  let{numOfWishItems}= useContext(wishContext)
  function logOut(){
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login')
  }
  async function getCart(){
    let {data} = await getUserCart()
    if(data?.status=='success'){
    localStorage.setItem('UserId' , data.data.cartOwner)
       console.log();
       
  }else{
    console.log(data);
  }
 
}
let test =  localStorage.getItem('UserId')
useEffect(()=>{
            getCart()
} , [])
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container">
  <Link className="navbar-brand fw-bold " to={'/'}> <i className="fas fa-cart-shopping text-main"></i> FreshCart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
     
      {userToken?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link" to={'/'}>Home</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to={'products'}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'brands'}>Brands</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to={`allOrders/${test}`}>Orders History</Link>
        </li> */}
      
        </ul>:""}

   <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       <li className="nav-item d-flex align-items-center">
{/* <Link className="nav-link  position-relative" to={'cart'}> <i className="fa-solid fa-cart-shopping text-main mx-1 cartWidth "></i><span className="cartNums text-dark">{numOfCartItems}</span></Link> */}
  
          <Link className="nav-link text-main" to={'cart'}> <i className="fas fa-shopping-cart cartIcon"><span className="cartNums">{numOfCartItems}</span></i> </Link>
          <Link className="nav-link text-main" to={'wishlist'}> <i className="fas fa-heart  wishIcon"><span className="wishNums">{numOfWishItems}</span> </i> </Link>

        
       <i className="fab fa-facebook mx-1 cursor-pointer"></i>
       <i className="fab fa-youtube mx-1 cursor-pointer"></i>
       <i className="fab fa-instagram mx-1 cursor-pointer"></i>
       <i className="fab fa-twitter mx-1 cursor-pointer"></i>
       <i className="fab fa-tiktok mx-1 cursor-pointer"></i>
         </li>
         {userToken?<>
         <li className="nav-item">
         <span onClick={()=>logOut()} className="nav-link cursor-pointer">Sign out</span>
       </li>
       </>
         :<> <li>
        <Link className="nav-link" to={'login'}>Login</Link>
          </li>
          <li className="nav-item">
          
          <Link className="nav-link" to={'register'}>Register</Link>
        </li> </>
}
        </ul>
      


       
    </div>
  </div>
</nav>
  </>
}
