import React from 'react'
import axios from "axios";
import { createContext, useState ,useEffect } from "react";
  export let wishContext = createContext()
  let userToken =localStorage.getItem('userToken')
 let headers = {
    token : userToken
 }
export default function WishlistContextProvider(props) {
   const [numOfWishItems, setNumOfWishItems] = useState(0)

   async function getList(){
        let {data} = await getWishListItems()
   if(data?.status=='success'){
    console.log("Yes");
    setNumOfWishItems(data.count)
   }
    }
    useEffect(()=>{
         getList()
    } , [])
    function getWishListItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            headers
        })
        .then((res)=> res)
        .catch((err)=>err)
    }
    function addTOWish(productId){
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
          productId
      } , {
          headers
      })
      .then((res)=>res)
      .catch((err)=>err)
    }

    function removeFromList(productId){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers
      })
      .then((res)=>res)
      .catch((err)=>err)  
    }

  return <>
   <wishContext.Provider  value={{getWishListItems , addTOWish , removeFromList , numOfWishItems  , setNumOfWishItems}}>
      { props.children}
   </wishContext.Provider>
  </>
}
