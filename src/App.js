import React, { Children, useLayoutEffect,useState } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import Brands from './components/Brands/Brands'
import ProductDetails from './components/ProductDetails/ProductDetails'
import UserTokenProvider from './Context/UserToken';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';
import CartContextProvider from './Context/CartContext';
import UpdatePass from './components/UpdatePass/UpdatePass';
import UserUpdates from './components/UserUpdates/UserUpdates';
import { Offline, Online } from "react-detect-offline";
import   {Toaster} from 'react-hot-toast';
import SubCatContextProvider from './Context/SubCatContext';
import SubCatProducts from './components/SubCatProducts/SubCatProducts';
import CatProducts from './components/CatProducts/CatProducts';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ProductsContextProvider from './Context/ProductsContext';
import VerifyCode from './components/VerifyCode/VerifyCode';
import BrandDetails from './components/BrandDetails/BrandDetails';
import NewPass from './components/NewPass/NewPass';
import UpdateData from './components/UpdateData/UpdateData';
import Checkout from './components/Checkout/Checkout'
import AllOrders from './components/AllOrders/AllOrders'
import Wishlist from './components/Wishlist/Wishlist';
import WishlistContextProvider from './Context/WishlistContext';
export default function App() { 
 let routers = createHashRouter([  
   {path:'/' , element:<Layout/> , children:[ 
    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'productDetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'categoryDetails/:id', element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
    {path:'subCatProducts/:id', element:<ProtectedRoute><SubCatProducts/></ProtectedRoute>},
    {path:'catProducts/:id', element:<ProtectedRoute><CatProducts/></ProtectedRoute>},
    {path:'brandDetails/:id', element:<ProtectedRoute><BrandDetails/></ProtectedRoute>},
    {path:'updatePass', element:<ProtectedRoute><UpdatePass/></ProtectedRoute>},
    {path:'userUpdates', element:<ProtectedRoute><UserUpdates/></ProtectedRoute>},
    {path:'wishlist', element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'checkout/:id', element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'allOrders/:id', element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:'forgetPassword', element:<ForgetPassword/>},
    {path:'verifyCode', element:<VerifyCode/>},
    {path:'newPass', element:<NewPass/>},
    {path:'updateData', element:<UpdateData/>},
    {path:'login', element:<Login/>},
    {path:'register', element:<Register/>},
    {path:'*', element:<Notfound/>},
  ]}
 ])
  return <>
 <WishlistContextProvider>
 <ProductsContextProvider>
  <SubCatContextProvider>
  <CartContextProvider>
        <UserTokenProvider>
   <RouterProvider router={routers}></RouterProvider>
   
    <Toaster/>
   </UserTokenProvider>
   </CartContextProvider>
   </SubCatContextProvider>
   </ProductsContextProvider>
 </WishlistContextProvider>
  </>
}



