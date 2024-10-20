import React, { useContext, useRef } from "react";
import styles from './ProductDetails.module.css'
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
  const testRef = useRef(null)
   let {addToCart ,setNumOfCartItems} = useContext(CartContext)
   async function postCart(productId){
    let {data}= await addToCart(productId)
    if(data.status=='success'){
     toast.success('added successfully to your cart' ,{
      duration:5000
     })
     setNumOfCartItems(data.numOfCartItems)
    }
   }


  var settings = {
    dots: false,
    infinite: true,
    autoplaySpeed:1000,
     autoplay:true,
     arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1
  }
   let {id}=useParams()
     function getProductDetails(id){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
     }
     let {data , isError , isLoading , isFetched}= useQuery("productDetails" ,()=>getProductDetails(id))
      

  return <>
  <Helmet>
                  <title>{data?.data.data.title}</title>
                
            </Helmet>
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
    </>:    <div className="row py-4 mt-5">
   <div className="col-md-3">
   <Slider {...settings}>
      {data?.data.data.images.map((image)=> <img key={data?.data.data.id} src={image} alt={data?.data.data.title} />)}
    </Slider>
      </div>
     <div className=" col-md-9 d-flex justify-content-center align-items-center">
           <div>
            <h2 className="h4 fw-bold">{data?.data.data.title}</h2>
            <p className="text-muted">{data?.data.data.description}</p>
            <h3 className="h4 fw-bold text-main">{data?.data.data.category.name}</h3>
            <div className="d-flex justify-content-between ">
          <span>{data?.data.data.price} EGP</span>
          <span><i className="fas fa-star rating-color"></i>{data?.data.data.ratingsAverage}</span>
         </div>
         <button onClick={()=>postCart(data?.data.data.id)} className="btn bg-main w-100 text-white mt-3">Add TO Cart</button>
           </div>
     </div>
          </div>}
          {/* <div className="row py-4">
   <div className="col-md-3">
   <Slider {...settings}>
      {data?.data.data.images.map((image)=> <img key={data?.data.data.id} src={image} alt={data?.data.data.title} />)}
    </Slider>
      </div>
     <div className="col-md-9 d-flex justify-content-center align-items-center">
           <div>
            <h2 className="h4 fw-bold">{data?.data.data.title}</h2>
            <p className="text-muted">{data?.data.data.description}</p>
            <h3 className="h4 fw-bold text-main">{data?.data.data.category.name}</h3>
            <div className="d-flex justify-content-between ">
          <span>{data?.data.data.price} EGP</span>
          <span><i className="fas fa-star rating-color"></i>{data?.data.data.ratingsAverage}</span>
         </div>
         <button onClick={()=>postCart(data?.data.data.id)} className="btn bg-main w-100 text-white mt-3">Add TO Cart</button>
           </div>
     </div>
          </div> */}


  
  </>
}
