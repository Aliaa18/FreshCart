import React, { useContext, useEffect, useState } from "react";
import styles from './CategoryDetails.module.css'
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { SubCatContext } from "../../Context/SubCatContext";
import { Helmet } from "react-helmet";
export default function CategoryDetails() {
  
  const [subCatonCat, setSubCatonCat] = useState(null)
  const [catDetails, setCatDetails] = useState(null)
 let {allSubCatOnCat}= useContext(SubCatContext)
  async function getAllSubCatOnCat(id){
    let {data}= await allSubCatOnCat(id)
      setSubCatonCat(data);
   }
useEffect(()=>{
  getAllSubCatOnCat(id)
},[])
let {id}=useParams()
   function getCategoryDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
   }
  let {data , isLoading ,isFetching , isError}=useQuery('CategoryDetails',()=> getCategoryDetails(id))
    
      
  return <>
       <Helmet>
         <title>{data?.data.data.name}</title>
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
/></div>: <div className=" mt-5 d-flex justify-content-center align-items-center mx-auto">
        <div className=" row py-4 shadow catDet">
        <div className="col-md-3">
       <img src={data?.data.data.image} alt="" className="w-100" /> 
       </div>
         <div className="col-md-7 d-flex  align-items-center">
           <div>
            <h2 className="h4">{data?.data.data.name}</h2>
            <h3 className="h5">Sub Categories:</h3>
            <div  className="d-flex justify-content-center align-items-center flex-wrap">
            {subCatonCat?.data.map((subCat)=>(
  < Link to={`/subCatProducts/${subCat._id}`} key={subCat._id} > <button  className="btn sub-btn  p-0 px-1 text-white me-2">{subCat.name}</button> </Link>
            
            )
)}
                      </div>
         </div>
         </div>
        </div>
   </div>}
  
          


  </>
}

          