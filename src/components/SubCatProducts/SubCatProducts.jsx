import React, { useContext, useEffect, useState } from "react";
import styles from './SubCatProducts.module.css'
import { ProductsContext } from "../../Context/ProductsContext";
import { SubCatContext } from "../../Context/SubCatContext";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
export default function SubCatProducts() {
  var settings = {
    dots: false,
    infinite: true,
    autoplaySpeed:1000,
     autoplay:true,
     arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  let {id} =useParams()
 const [loading, setLoading] = useState(true)
const [proData, setProData] = useState()
const [subCatData, setSubCatData] = useState()
let{addToCart}= useContext(CartContext)
let {getProducts} = useContext(ProductsContext)
let {subCategory} = useContext(SubCatContext)
async function postCart(productId){
  let {data}= await addToCart(productId)
  if(data.status=='success'){
   toast.success('added successfully to your cart' ,{
    duration:5000
   })
  }
 }
 async function getCatProducts(){
  let {data}= await getProducts()
    setProData(data);
    setLoading(false)
 }
 async function getSubCat(id){
  let {data}= await subCategory(id)
    setSubCatData(data)
    setLoading(false)
 }
 useEffect(() => {
       getCatProducts();
       getSubCat(id)
 }, [])
  return <>
  {loading?
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
/></div>:          <div className="row mt-5 g-5">
       {proData?.data.filter((pro)=>(pro.subcategory[0].name == subCatData?.data.name)).map((pro)=>(
        < div key={pro.id} className="col-md-2 product py-3">
        < Link to={`/productDetails/${pro.id}`}>
      <img src={pro.imageCover} className="w-100" height={250} alt={pro.description} />
      <h3 className="h6 text-main ">{pro.subcategory[0].name}</h3>
        <h5 className="mb-3">{pro.title.split(' ').slice(0,2).join(" ")}</h5>
        <div className="d-flex justify-content-between ">
         <span>{pro.price} EGP</span>
         <span><i className="fas fa-star rating-color"></i>{pro.ratingsAverage}</span>
        </div>
      </Link>
     </div>
       ))}
       </div>
       }
          
  </>
}
