import React from "react";
import styles from './Checkout.module.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from 'yup'
export default function Checkout() {
  let {id} = useParams()
  console.log(id);
  let{onlinePayment}=useContext(CartContext)
 async function checkout( values){
        let {data} =await onlinePayment(id , values)
        if(data?.status=='success'){
          window.location.href=data.session.url;
        }
  }

  let validationSchema= Yup.object ({
    details:Yup.string().min(3,'The Minimum length is 3!').max(200,'The Maximum length is 200 letter!').required('details are required!'),         
   phone:Yup.string().matches(/^01[0125][0-9]{8}$/, 'we need an egyptian phone!').required('Phone is required!'),     
   city:Yup.string().min(3,'The Minimum length is 3!').max(30,'The Maximum length is 30 letter!').required('city is required!'),         

  })
let formik =useFormik({
  initialValues:{
    details: "",
        phone: "",
        city: ""
  },validationSchema ,onSubmit:checkout
})



  return <>
                       <div className="mt-5 col-md-9 mx-auto p-5">
                        <form onSubmit={formik.handleSubmit}>
                          <label htmlFor="details">Details</label>
         <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="details" value={formik.values.details} name="details" className="form-control mb-3"  />
         {formik.errors.details && formik.touched.details? <div className="alert alert-danger py-2">{formik.errors.details}</div>:"" }                           

         <label htmlFor="phone">Phone</label>
         <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id="phone" value={formik.values.phone} name="phone" className="form-control mb-3"  />
         {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger py-2">{formik.errors.phone}</div>:"" }                           

         <label htmlFor="city">City</label>
         <input type="text" id="city" value={formik.values.city} name="city" className="form-control mb-3" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.city && formik.touched.city? <div className="alert alert-danger py-2">{formik.errors.city}</div>:"" }                           

                  <button className="w-100 btn bg-main text-white " >Pay</button>
                    </form>
                         </div>
  </>
}
