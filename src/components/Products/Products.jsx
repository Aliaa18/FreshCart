import React, { useContext, useRef } from "react";
import styles from './Products.module.css'
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { wishContext } from "../../Context/WishlistContext";

export default function Products() {
  const testRef = useRef()
  let {addToCart , setNumOfCartItems}= useContext(CartContext)
  let{addTOWish ,setNumOfWishItems}= useContext(wishContext)
    async function postCart(productId){
        let {data} = await  addToCart(productId)
        if (data.status=="success"){
         toast.success('added successfully to your cart' , {
            duration: 3000,
         })
         setNumOfCartItems(data.numOfCartItems)
        }
     }

    function getProducts(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
   let {data , isLoading , isFetching , isError} = useQuery('getProducts' , getProducts , {
       refetchOnMount:false
   })
   async  function postWish(productId){
    let {data} = await addTOWish(productId)
    if (data.status=="success"){
     toast.success('added successfully to your wish list' , {
        duration: 3000,
        
     })
     console.log(data);
     
     setNumOfWishItems(data?.data.length)
    }

}
          
  return <>
  <Helmet>
         <title>Products</title>
  </Helmet>
  {isLoading? <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
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
   </div>:""}
   <div className="row gap-5 g-3 mt-2">
  
   {data?.data.data.map((pro)=>(
   
     < div key={pro.id} className="col-md-2">
      <div className="product p-2">
        < Link to={`/productDetails/${pro.id}`}>
      <img src={pro.imageCover} className="w-100"  alt={pro.description} />
      <h3 className="h6 text-main fw-bold">{pro.category.name}</h3>
        <h5  className="h5 mb-4">{pro.title.split(' ').slice(0,2).join(" ")}</h5>
        <div className="d-flex justify-content-between ">
         <span>{pro.price} EGP</span>
         <span><i className="fas fa-star rating-color"></i>{pro.ratingsAverage}</span>
        </div>
      </Link>
      <div className="d-flex align-items-center justify-content-between heart ">
         <button  onClick={()=>postCart(pro.id)} className="btn bg-main w-75  text-white mt-1">Add TO Cart</button>
         <i  onClick={()=>postWish(pro.id)} className="fa-regular fa-heart fa-lg text-main "></i>
         </div></div>
     </div>
     
   ))}
 </div>
      
  </>
}
