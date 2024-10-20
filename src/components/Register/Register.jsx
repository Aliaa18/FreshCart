import React, { useState } from "react";
import styles from './Register.module.css'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Register() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  let navigate=useNavigate();



  async function register(values){
    setLoading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err)=>{
          setError(err.response.data.message);
          setLoading(false)
          console.log("hello");
        })

         if(data.message=='success'){
          setLoading(false)
          navigate('/login')
          console.log("No");
         }
         
  }

   let validationSchema = Yup.object({
   name:Yup.string().min(3,'The Minimum length is 3!').max(15,'The Maximum length is 15!').required('Name is required!'),         
   email:Yup.string().email('invalid email!').required('Email is required!'),
   password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with upperCase and then any lowerCase or number from 6 ro 11 !').required('Password is required!'),
   rePassword:Yup.string().oneOf([Yup.ref('password')],'password and rePassword don`t match!').required('rePassword is required!'),
   phone:Yup.string().matches(/^01[0125][0-9]{8}$/, 'we need an egyptian phone!').required('Phone is required!'),     
  }) 
  let formik= useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema, onSubmit:register
  })
  return <>
      <Helmet>
        <title>Register</title>
      </Helmet>

                     <div className="w-75 mx-auto p-4 ">
                              <h2>Ragister Now</h2>
        {error?<div className="alert alert-danger py-2">{error}</div>:"" }                                                 
        <form onSubmit={formik.handleSubmit}>
           <label htmlFor="name">Name:</label>
  <input type="text" name="name" id="name" value={formik.values.name}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
 {formik.errors.name && formik.touched.name? <div className="alert alert-danger py-2">{formik.errors.name}</div>:"" }                           

  <label htmlFor="email">Email:</label>
  <input type="email" name="email" id="email" value={formik.values.email}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.email && formik.touched.email? <div className="alert alert-danger py-2">{formik.errors.email}</div>:"" }                           

                            <label htmlFor="password">Password:</label>
  <input type="password" name="password" id="password" value={formik.values.password}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.password && formik.touched.password? <div className="alert alert-danger py-2">{formik.errors.password}</div>:"" }                           


                            <label htmlFor="rePassword">rePassword:</label>
  <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword}  className="mb-2 form-control" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger py-2">{formik.errors.rePassword}</div>:"" }                           


                            <label htmlFor="phone">Phone:</label>
  <input type="tel" name="phone" id="phone" value={formik.values.phone}  className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger py-2">{formik.errors.phone}</div>:"" }                           

{loading==true?<button type="button" className="btn bg-main text-white">
                <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className="btn bg-main text-white">Submiut</button>}
                        

                              </form>
                     </div>
  </>
}


// let user={};
// user.name="Ahmed";
// console.log(user);