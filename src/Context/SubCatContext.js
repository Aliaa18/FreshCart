import axios from "axios";
import { createContext } from "react";
import { useParams } from "react-router-dom";

export let SubCatContext= createContext();

export default function SubCatContextProvider(props){
  
     function allSubCatOnCat(id){
             return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
             .then((res)=>res)
             .catch((err)=>err)
     }
     
     function subCatOnCat(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        .then((res)=>res)
        .catch((err)=>err)
}
     function  subCategory(id){
               return axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
               .then((res)=>res)
        .catch((err)=>err)
     }
     
     function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((res)=>res)
        .catch((err)=>err)
      }

    return<SubCatContext.Provider value={{allSubCatOnCat , getCategories , subCatOnCat ,subCategory}}>
        {props.children}
    </SubCatContext.Provider>
}