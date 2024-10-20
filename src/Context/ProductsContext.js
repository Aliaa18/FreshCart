import axios from "axios";
import { createContext } from "react";

export let ProductsContext=createContext()

export default function ProductsContextProvider(props){
       function getProducts(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
       .then((res)=>res)
       .catch((err)=>err)
       }
       

    return<ProductsContext.Provider value={{getProducts}}>
        {props.children}
    </ProductsContext.Provider>
}