import React, { useContext, useState } from "react";
import styles from './UpdatePass.module.css'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserToken } from "../../Context/UserToken";
import toast from "react-hot-toast";
let userToken =localStorage.getItem('userToken')
 let headers = {
    token : userToken
 }
export default function UpdatePass() {
  
  let{setUserToken} = useContext(UserToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  let navigate=useNavigate();
  
  async function updatePass(values){
    setLoading(true)
        let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
          values
         ,{
          headers
        })
        .catch((err)=>{
          setError(err.response.data.message);
          setLoading(false)
          console.log(err);
        })

         if(data.message == 'success'){
          toast.success('Password changed successfully' , {
            duration: 4000,
         })
              navigate('/')
              setLoading(false)
              console.log(data);

         }
         
  }
  let validationSchema = Yup.object({
 currentPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password!').required('Current Password is required!'),
 password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password!').required('New Password is required!'),
 rePassword:Yup.string().oneOf([Yup.ref('password')],'password and rePassword don`t match !').required('rePassword is required!'),
        
    }) 



  let formik = useFormik({
    initialValues:{
      currentPassword:"",
      password:"",
      rePassword:""
     },validationSchema,
    onSubmit:updatePass
  })


  return <>
    <div className="w-75 mx-auto p-4 ">
                              <h2>Change your Password</h2>
        {error?<div className="alert alert-danger py-2">{error}</div>:"" }                                                 
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="currentPassword">currentPassword:</label>
  <input type="password" name="currentPassword" id="currentPassword" value={formik.values.currentPassword}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.currentPassword && formik.touched.currentPassword? <div className="alert alert-danger py-2">{formik.errors.currentPassword}</div>:"" }                           
   <label htmlFor="Password">NewPassword:</label>
  <input type="password" name="password" id="password" value={formik.values.password}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.password && formik.touched.password? <div className="alert alert-danger py-2">{formik.errors.password}</div>:"" }                           
     <label htmlFor="rePassword">rePassword:</label>
  <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger py-2">{formik.errors.rePassword}</div>:"" }                           


                           
{loading==true?<button type="button" className="btn bg-main text-white">
                <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className="btn bg-main text-white">Continue</button>}
                        

                              </form>
                     </div>
  </>
}
