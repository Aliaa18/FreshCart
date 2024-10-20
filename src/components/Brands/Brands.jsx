import React from "react";
import styles from './Brands.module.css'
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
 let {data , isError , isLoading , isFetching} = useQuery('getBrands' , getBrands , {
   refetchOnMount:false,
 })
     
  return <>
  <Helmet>
    <title>Brands</title>
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
     <div className="row  g-3 mt-2">
      {data?.data.data.map((brand)=>(
               <div key={brand._id} className="col-md-3 mb-3 ">
                <Link to={`/brandDetails/${brand._id}`}>
                <div className="brand px-2 ">
                <img src={brand.image} className="w-100 mb-2 "  height={250}/>
                
                <h3 className="h5 text-lighted">{brand.name}</h3>
          
                 </div>
                 </Link>
         
         </div>
      )
      )}
         </div>
  </>
}
