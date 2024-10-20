import React from "react";
import styles from './Categories.module.css'
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Categories() {
 function getCategories(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
 }
let {data , isError , isLoading , isFetching} = useQuery('getCategories' , getCategories , {
  refetchOnMount:false,
})
    
  return <>
  <Helmet>
         <title>Categories</title>
  </Helmet>
  {isLoading?
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
   </div>:""}
     <div className="row gap-5 g-3 mt-2">
      {data?.data.data.map((cat)=>(
               <div key={cat._id} className="col-md-2 mb-3 ">
                <div className="cat">
                <Link to={`/categoryDetails/${cat._id}`} >
                <img src={cat.image} className="w-100 mb-2 "  height={250}/>
                </Link>
                <Link to={`/CatProducts/${cat._id}`}>
                <div className="d-flex align-items-center justify-content-center p-2">
                <h3 className="h6 text-lighted">{cat.name}</h3>
                 </div>
                 </Link>
                 </div>
         
         </div>
      )
      )}
         </div>
  </>
}
