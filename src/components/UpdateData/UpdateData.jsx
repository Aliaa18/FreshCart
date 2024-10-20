import React, { useContext, useState } from "react";
import styles from './UpdateData.module.css'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useFormik , Formik } from "formik";
import * as Yup from 'yup';
import { UserToken } from "../../Context/UserToken";
let userToken = localStorage.getItem('userToken')
let headers={
  token:userToken
}
export default function UpdateData() {
  let{setUserToken} = useContext(UserToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  let navigate=useNavigate();
 async function updateData(values){
       let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/` ,
        values
       ,{
        headers
       })
       .catch((err)=>{
       setError(err.response.data.message);
        setLoading(false)
        console.log(err);
      })

       if(data.message=='success'){
        toast.success('Your data updated successfully' , {
          duration: 5000,
       })
            navigate('/')
            setLoading(false)
            console.log(data);

       }
       
 }

 let validationSchema = Yup.object({
  name:Yup.string().min(3,'The Minimum length is 3!').max(15,'The Maximum length is 15!').required('Name is required!'),         
  email:Yup.string().email('invalid email!').required('Email is required!'),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/, 'we need an egyptian phone!').required('Phone is required!'),     
 
     }) 
 
 
 
   let formik = useFormik({
     initialValues:{
      name:'',
      email:'',
      phone:''
      },validationSchema,
     onSubmit:updateData
   })





  return  <>
  <div className="w-75 mx-auto p-4 ">
                            <h2>Update your data</h2>
      {error?<div className="alert alert-danger py-2">{error}</div>:"" }                                                 
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name:</label>
<input type="text" name="name" id="name" value={formik.values.name}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
{formik.errors.name && formik.touched.name? <div className="alert alert-danger py-2">{formik.errors.name}</div>:"" }                           
 <label htmlFor="email">Email:</label>
<input type="email" name="email" id="email" value={formik.values.email}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
{formik.errors.email && formik.touched.email? <div className="alert alert-danger py-2">{formik.errors.email}</div>:"" }                           
   <label htmlFor="phone">Phone:</label>
<input type="tel" name="phone" id="phone" value={formik.values.phone}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
{formik.errors.phone && formik.touched.phone? <div className="alert alert-danger py-2">{formik.errors.phone}</div>:"" }                           


                         
{loading==true?<button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
              </button> : <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className="btn bg-main text-white">Continue</button>}
                      

                            </form>
                   </div>
</>
}
