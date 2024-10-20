import React, { useContext, useEffect, useState } from "react";
import styles from './BrandDetails.module.css'
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { SubCatContext } from "../../Context/SubCatContext";
import { Helmet } from "react-helmet";

export default function BrandDetails() {
  let {id}=useParams()
     function getBrandDetails(id){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
     }
     let {data , isError , isLoading , isFetched}= useQuery("brandDetails" ,()=>getBrandDetails(id))
  return <>
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
/></div>:
 <div className=" w-75 mt-5 d-flex justify-content-center align-items-center mx-auto">
        <div className=" w-100 row py-4 shadow catDet">
        <div className="col-md-3">
       <img src={data?.data.data.image} alt="" className="w-100" /> 
       </div>
         <div className="col-md-7 d-flex align-items-center">
            <h2 className="h5 text-muted">{data?.data.data.name}</h2>
    </div>
        </div>
   </div>}
  
          
  </>
}
