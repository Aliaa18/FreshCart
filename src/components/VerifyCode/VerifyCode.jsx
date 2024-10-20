import React, { useContext, useState } from "react";
import styles from './VerifyCode.module.css'
import { Formik, useFormik } from "formik";
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import { UserToken } from "../../Context/UserToken";

import axios from "axios";
export default function VerifyCode() {
  let{setUserToken} = useContext(UserToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  let navigate=useNavigate();

  async function verifyCode(values){
          setLoading(true)
          let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
          .catch((err)=>{
            setError(err.response.data.message);
            setLoading(false)
            console.log(err)
          })
  
           if(data){
            setLoading(false)
                navigate('/newPass')
                console.log(data);
  
           }
           
  }

  let validationSchema = Yup.object({
    resetCode:Yup.string().matches(/^[0-9]{6}$/,'invalid ResetCode!')
    }) 
  let formik= useFormik({
    initialValues:{
      resetCode:''
    },validationSchema,
    onSubmit:verifyCode
  })
  return <>
     <div className="mt-5 w-50">
    <h2 className="fw-bold">Confirm your account</h2>
    <p>We sent a code to your email. Enter that code to confirm your account.</p>
    {error?<div className="alert alert-danger py-2">{error}</div>:"" } 
    <form  onSubmit={formik.handleSubmit}>
<input type="password" name="resetCode" placeholder="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} id="restCode" className="mb-2 form-control" />
{formik.errors.resetCode && formik.touched.resetCode?<div className="alert alert-danger py-2">{formik.errors.resetCode}</div>:""}   
{loading==true?<button type="button" className="btn bg-main text-white">
                <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className="btn bg-main text-white">Continue</button>}                         
         </form>
    </div>
  </>
}
