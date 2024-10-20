import React, { useContext, useEffect } from "react";
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from "react-router-dom";
import { UserToken } from "../../Context/UserToken";
import { Offline, Online } from "react-detect-offline";
export default function Layout() {
let{setUserToken} = useContext(UserToken)
 useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])
  return <>
   <Navbar/>
  <div className="container pt-5"> <Outlet></Outlet>
    <Offline> <div className="alert alert-danger fixed-top text-center"> Only shown offline (surprise!)</div></Offline>
  </div>
   <Footer/>
  </>
}
