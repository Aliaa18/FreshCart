import React, { useContext, useEffect } from "react";
import styles from './AllOrders.module.css'
import { CartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";

export default function AllOrders() {
     let {id} = useParams()
  let {getAllOrders}=useContext(CartContext)
 async function allOrders(id){
   let {data}= await getAllOrders(id);
   console.log(data);
  }
  useEffect(()=>{
    allOrders(id);
  },[])
  
  return <>
             <div className="container mt-5">
  <div>
    <div className="row">
      <div className="col-md-4">
      <div className="card" style={{width: 18 + 'rem'}}>
  <img src="" className="card-img-top" alt="..." />
  <div className="card-body">
    <p className="card-text"></p>
  </div>
</div>
      </div>
    </div>
  </div>

             </div>
  </>
}
