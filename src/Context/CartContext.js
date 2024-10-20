import axios from "axios";
import { createContext, useState ,useEffect } from "react";

export let CartContext= createContext();

 let userToken =localStorage.getItem('userToken')
 let userId = localStorage.getItem('userId')
 let headers = {
    token : userToken
 }
 
 export default function CartContextProvider(props){
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [owner , setCartOwner] = useState(null)
   
  async function getCartItems(){
    let {data}= await getUserCart();
      if(data?.status=='success'){
    setNumOfCartItems(data.numOfCartItems)
     setCartOwner(data.data.cartOwner)
     localStorage.setItem('UserId' , owner)
      }
   }
   
   useEffect(() => {
     getCartItems()
   }, [])
   
        function removeCart(){
          return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
          })
          .then((res)=>res)
    .catch((err)=>err)
        }
   function addToCart(productId){
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
        productId
    } , {
        headers
    })
    .then((res)=>res)
    .catch((err)=>err)
  }
  function getUserCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
      headers
    })
    .then((res)=>res)
    .catch((err)=>err)
  }

  function removeCartItems(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
      headers
    })
    .then((res)=>res)
    .catch((err)=>err)
  }

  function updateCartItems(id , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
      count
    },{
      headers
    })
  }
  function onlinePayment(cartId , shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , 
     { shippingAddress
  },{
      headers
    })
  }
   function getAllOrders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    .then((res)=>res)
    .catch((err)=>err)
   }

    return <>
    <CartContext.Provider value={{ owner , setCartOwner , numOfCartItems,setNumOfCartItems ,addToCart , getUserCart , getAllOrders, removeCartItems , updateCartItems ,removeCart ,onlinePayment}}>
      {props.children} 
    </CartContext.Provider>
 </>
 }

