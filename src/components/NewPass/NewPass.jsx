import React, { useContext, useState } from "react";
import styles from './NewPass.module.css'
import { Formik, useFormik } from "formik";
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import { UserToken } from "../../Context/UserToken";
import axios from "axios";

export default function NewPass() {
  let{setUserToken} = useContext(UserToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  let navigate=useNavigate();
  async function newPass(values){
        let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
        .catch((err)=>{
          setError(err.response.data.message);
          setLoading(false)
         // console.log(err);
        })

         if(data.token){
          setLoading(false)
              navigate('/')
            //  console.log("hello");

         }
         
  }

  let validationSchema = Yup.object({
    newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password!').required('Password is required!'),
     email:Yup.string().email('invalid email!').required('Email is required!'),

    }) 

    let formik= useFormik({
      initialValues:{
        email:"",
        newPassword:''
      },validationSchema,
      onSubmit:newPass
    })
  return <>
  <div className="w-50 mx-auto p-4 mt-5">
   
           <h2 className="mb-3">Create a new password</h2>
        
           
           {error?<div className="alert alert-danger py-2">{error}</div>:"" }       
<form onSubmit={formik.handleSubmit}>
<label htmlFor="email">Email:</label>
  <input type="email" name="email" id="email" value={formik.values.email}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.email && formik.touched.email? <div className="alert alert-danger py-2">{formik.errors.email}</div>:"" }                           

                           
                         

         <label htmlFor="newPassword">NewPassword:</label>
<input type="password" name="newPassword" id="newPassword" value={formik.values.newPassword}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
{formik.errors.newPassword && formik.touched.newPassword? <div className="alert alert-danger py-2">{formik.errors.newPassword}</div>:"" }                           


        
         
{loading==true?<button type="button" className="btn bg-main text-white">
<i className="fas fa-spinner fa-spin"></i>
</button> : <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className="btn bg-main text-white">Continue</button>}        
           </form>
        
  </div>
</>
}
