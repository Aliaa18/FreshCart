import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from "react-loader-spinner";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { wishContext } from '../../Context/WishlistContext'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";


export default function Wishlist() {
 const [details , setDetails] = useState(false)
 const [loading , setLoading] = useState(true)
    let {getWishListItems ,setNumOfWishItems, removeFromList}= useContext(wishContext)

    async function getWish(){
      let {data} = await getWishListItems()
      if(data?.status=='success'){
      setDetails(data);
      setLoading(false)
     setNumOfWishItems(data.data.length)
      console.log("lol" , data.data.length);
      
    }else{
      setLoading(false)
    }
  }
      // async function removeWish(id){
      //  let {data} = await removeFromList(id)
      //  confirmAlert({
      //   title: 'Delete Wishlist item',
      //   message: 'Are you sure to delete this item?',
      //   buttons: [
      //     {
      //       label: 'Yes',
      //       onClick: () => {
      //         if (data.status=='success'){
      //         setDetails(data)
      //         setLoading(false)
      //         toast.success('Item deleted from your wish list' , {
      //           duration: 3000,
      //        })
      //         }
      //       }
              
      //     },
      //     {
      //       label: 'No',
      //       onClick: () => {}
      //     }
      //   ]
      // });
         

      //  }

      async function removeWish(id) {
        let {data} = await removeFromList(id)
        if (data.status=='success') {
            setDetails(data)
            setLoading(false)
            setNumOfWishItems(data.data.length)
            console.log(data); 
        }else{
          setLoading(false)
        }
      }
  useEffect(()=>{
              getWish();

        
  } , [details])
  
  
  return <>
  <Helmet>
         <title>Wishlist</title>
  </Helmet>
  {loading?
   <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
   <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
   </div>:""}
     <div className="row gap-5 g-3 mt-2">
      {details.data?.map((item)=>(
               <div key={item._id} className="col-md-2 mb-3 ">
                <div className="">
                <div>
                <img src={item.imageCover} className="w-100 mb-2 "  />
                <div>
                  </div>
                  <Link to={`productDetails/${item.id}`} className='btn bg-main w-75 text-white mt-1'> 
                  product details
                 </Link>
<button onClick={()=>{removeWish(item._id)}} className="btn ms-1 "><i className="fas fa-trash-can fa-lg text-main"></i> </button>
          
                </div>
                

                 </div>
         
         </div>
      )
      )}
         </div>
  </>
}
