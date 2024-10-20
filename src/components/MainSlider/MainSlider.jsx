import React from "react";
import styles from './MainSlider.module.css'
import Slider from "react-slick";
import slide1 from "../../Assets/slide1.jpg"
import slide2 from "../../Assets/slide2.jpg"
import slide3 from "../../Assets/slide3.jpg"
import slide4 from "../../Assets/slide4.jpg"
import slide5 from "../../Assets/slide5.jpg"
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    autoplaySpeed:1000,
     autoplay:true,
     arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return <>
  <div className="row gx-0 my-3">
    <div className="col-md-10">
    <Slider {...settings}>
           <img src={slide1} height={500} className="w-100" />
           <img src={slide4}  height={500} className="w-100"  />

           {/* <img src={slide2} height={500} className="w-100"/> */}
           <img src={slide3} height={500} className="w-100"/>
    </Slider>
    </div>
    <div className="col-md-2">
    <img src={slide2} height={250} className="w-100"/>
    <img src={slide5} alt="" height={250} className="w-100"  />
    </div>
    </div>
  </>
}
