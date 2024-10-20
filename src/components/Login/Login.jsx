import React, { useContext, useState } from "react";
import styles from './Login.module.css'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserToken } from "../../Context/UserToken";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login() {
   let{setUserToken} = useContext(UserToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  let navigate=useNavigate();
  
  async function login(values){
    setLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
        .catch((err)=>{
          setError(err.response.data.message);
          setLoading(false)
         
          
      
        })

         if(data.message == 'success'){
        
          
          setLoading(false)
          localStorage.setItem( 'userToken' , data.token)
          setUserToken(data.token)
              navigate('/')
              

         }
         
  }
   let validationSchema = Yup.object({
  email:Yup.string().email('invalid email!').required('Email is required!'),
   password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password!').required('Password is required!'),
        
  }) 
 
  let formik= useFormik({
    initialValues:{
      email:'',
      password:''
    },validationSchema,
    onSubmit:login
  })
  return <>
  <Helmet>
    <title>Login</title>
  </Helmet>
                     <div className="w-75 mx-auto p-4 ">
                      <div className="d-flex justify-content-center align-items-center my-5">
                              <h2>Login Now</h2>
                              </div>
        {error?<div className="alert alert-danger py-2">{error}</div>:"" }                                                 
        <form onSubmit={formik.handleSubmit}>

  <label htmlFor="email">Email:</label>
  <input type="email" email="email" id="email" value={formik.values.email}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.email && formik.touched.email? <div className="alert alert-danger py-2">{formik.errors.email}</div>:"" }                           

                            <label htmlFor="password">Password:</label>
  <input type="password" password="password" id="password" value={formik.values.password}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.password && formik.touched.password? <div className="alert alert-danger py-2">{formik.errors.password}</div>:"" }                           


                           
                            
{loading==true?<button type="button" className="btn bg-main text-white">
                <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className="btn bg-main text-white">Submiut</button>}        
                              </form>
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <Link to={`/forgetPassword`} className="text-danger">Forget Password?</Link>  
                    </div>          
                     </div>
  </>
}


// let user={}
// user.name="Ahmed"
// console.log(user);
