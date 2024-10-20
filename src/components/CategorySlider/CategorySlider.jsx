import React, { useEffect, useState } from "react";
import styles from './CategorySlider.module.css'
import Slider from "react-slick";
import axios from "axios";
export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    autoplaySpeed:1000,
     autoplay:true,
     arrows:false,
    slidesToShow: 5,
    slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            // className: "center",
            // centerMode: true,
            // infinite: true,
            //centerPadding: "60px",
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    
    
  }
        const [categories, setCategories] = useState([])
  async function getCategory(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategories(data?.data)
  }
  useEffect(()=>{
            getCategory();
  },[])

  return <>
      <h2 className="h4 mt-4">Shop popular Category</h2>
      <div className="my-3">
            <Slider {...settings}>
      {categories.map((category)=>
      <div key={category._id}>
       <img src={category.image} height={200} alt={category.name} />
         <h3 className="h6 fw-bold mt-2" >{category.name}</h3>
         </div>
       )}
    </Slider>
    </div>
  </>
}
