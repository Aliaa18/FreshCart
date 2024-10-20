import React, { useContext, useEffect } from "react";
import styles from './FeaturedProducts.module.css'
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishContext } from "../../Context/WishlistContext";
export default function FeaturedProducts() {
  
   let {addToCart ,setNumOfCartItems}= useContext(CartContext)
    let{addTOWish , setNumOfWishItems}  =  useContext(wishContext)
   
   async function postCart(productId){
        let {data} = await  addToCart(productId)
        if (data.status=="success"){
         toast.success('added successfully to your cart' , {
            duration: 3000,
         })
           setNumOfCartItems(data.numOfCartItems)
        }
     }


  function getFeaturedProducts (){
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
 }
 async  function postWish(productId){
     let {data} = await addTOWish(productId)
     if (data.status=="success"){
      toast.success('added successfully to your wish list' , {
         duration: 3000,
      })
     // console.log(data);
      
      setNumOfWishItems(data?.data.length)
     }

 }

 let {data , isLoading , isFetching , isError} = useQuery('FeaturedProducts' , getFeaturedProducts , {
  refetchOnMount:false,
  
 })


  return <>
    {isLoading?<>
   <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
   <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
   </div>
    </>:""}
    <div className="row gy-4 ">
      {data?.data.data.map((product)=>(
               <div key={product.id} className="col-md-2 ">
                  <div className="product p-2">
                <Link to={`productDetails/${product.id}`}>
                <img src={product.imageCover} className="w-100 "  alt={product.description} />
            
         <h3 className="h6 text-main fw-bold">{product.category.name}</h3>
         <h3 className="h5 mb-4">{product.title.split(' ').slice(0,2).join(" ")}</h3>
         <div className="d-flex justify-content-between ">
          <span>{product.price} EGP</span>
          <span><i className="fas fa-star rating-color"></i>{product.ratingsAverage}</span>
         </div>
         </Link>

        
         <div className="d-flex align-items-center justify-content-between heart ">
         <button onClick={()=>postCart(product.id)} className="btn bg-main w-75  text-white mt-1">Add TO Cart</button>
         <i onClick={()=>postWish(product.id)} className="fa-regular fa-heart fa-lg text-main"></i>
         </div>

         </div>
               </div>
      )
      )}
         </div>



  </>
}
