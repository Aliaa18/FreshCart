import React, { useContext, useState } from "react";
import styles from './ForgetPassword.module.css'
import { Formik, useFormik } from "formik";
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import { UserToken } from "../../Context/UserToken";
import axios from "axios";
export default function ForgetPassword() {
  let{setUserToken} = useContext(UserToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  let navigate=useNavigate();
  async function forgetPass(values){
    setLoading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
        .catch((err)=>{
          setError(err.response.data.message);
          setLoading(false)
          
        })
         if(data.message=="Reset code sent to your email"){
          setLoading(false)
           navigate('/verifyCode')
    

         }
         
  }

  let validationSchema = Yup.object({
    email:Yup.string().email('invalid email!')
    }) 
  let formik= useFormik({
    initialValues:{
      email:''
    },validationSchema,
    onSubmit:forgetPass
  })
  return <>
           <div className="mt-5 w-50">
            <h3 className="fw-bold">Find your account</h3>
            <p>Enter your email :</p>
            {error?<div className="alert alert-danger py-2">{error}</div>:"" } 
            <form onSubmit={formik.handleSubmit}>
<input type="email" email="email" placeholder="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mb-2 form-control" />
{formik.errors.email && formik.touched.email?<div className="alert alert-danger py-2">{formik.errors.email}</div>:"" }   
{loading==true?<button type="button" className="btn bg-main text-white">
                <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className="btn bg-main text-white">Find an account</button>}                         
         </form>
           </div>
  </>
}
