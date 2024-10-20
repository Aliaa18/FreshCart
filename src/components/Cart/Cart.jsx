import React, { useContext, useEffect, useState } from "react";
import styles from './Cart.module.css'
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { date } from "yup";



export default function Cart() {
  let test;
 const [details, setDetails] = useState(null)
 const [Loading, setLoding] = useState(true)
 let {getUserCart , removeCartItems, setNumOfCartItems , updateCartItems , removeCart}=  useContext(CartContext)

 async function deleteCart(){
  let {data} =await removeCart()
  if(data?.message=="success"){
    setDetails(null);
    console.log(data);

    setNumOfCartItems(0)
     test = localStorage.getItem('UserId') 
     console.log(test);
  }
 }
 async function updateCart(id , count){
  let {data}= await updateCartItems(id , count)
  if(data?.status =='success'){
    setDetails(data)
    
  }
 }
   async function removeItems(id){
    let {data} = await removeCartItems(id)
    if(data?.status =='success'){
      setDetails(data)
      console.log(data);
      setNumOfCartItems(data.numOfCartItems)
     
     
    }
   }
   async function getCart(){
      let {data} = await getUserCart()
      if(data?.status=='success'){
      setDetails(data);
      setLoding(false)
     setNumOfCartItems(data.numOfCartItems)
      console.log(data);
      localStorage.setItem('UserId' , data.data.cartOwner)
      console.log(test);
      
    }else{
      console.log(data.products);
       
      setLoding(false)
    }
   
  }
  useEffect(()=>{
              getCart()
  } , [])
  
  return <>
  <Helmet>
    <title>Cart</title>
  </Helmet>
  {Loading?
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
 /></div>
 :(
  <div className="bg-main-light mt-5 p-4">
    {details?.data.products.length>0?  
      <div >
        <h2 className="h5">Shop Cart :</h2>
        <h3 className="h6  text-main fw-bold">Cart Items : {details.numOfCartItems}</h3>
        <h3 className="h6 text-main fw-bold">Total Cart Price : {details.data.totalCartPrice} EGP </h3>
             {details.data.products.map((pro)=>(
              <div className="row border-bottom mt-3 mb-3" key={pro._id}>
                <div className="col-md-1">
                  <div>
                  <img src={pro.product.imageCover} className="w-100" alt="" />
                </div>
                </div>
                <div className="col-md-11">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                        <div>
                         <h4 className="h6">{pro.product.title.split(" ").slice(0,4).join(" ")}</h4>
                          <h6 className="text-main">Price : {pro.price}</h6>
    <button onClick={()=>removeItems(pro.product._id)} className="btn p-0 "><i className="fas fa-trash-can text-main"></i> Remove</button>
                         </div>
                         <div>
                             <div>
          <button onClick={()=>updateCart(pro.product._id ,pro.count+1 )} className="btn main-border p-1 px-2 me-2">+</button>
                              <span>{pro.count}</span>
                              <button onClick={()=>updateCart(pro.product._id ,pro.count-1 )} className="btn main-border p-1 px-2 ms-2">-</button>
                              </div>
                         </div>
                         </div>
                  </div></div>
              
            ))}   

            <div className="d-flex  justify-content-around align-items-center">
     <Link to={`/checkout/${details.data._id}`}><button className="btn bg-main text-white"> Checkout</button></Link>  

        <button onClick={()=>deleteCart()} className="btn bg-main text-white"><i className="fas fa-trash-can text-white"></i> Remove Cart</button>      
        </div>
         </div>
           :  
           <div className="bg-main-light text-center p-4">
           <h2 >Cart is empty</h2>
               </div>
               }
               </div>
 )
 }

     
         
  </>
  
}
