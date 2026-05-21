// components/carousel.jsx

"use client";

import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel({
  children,
  slidesPerView = 1,
  spaceBetween = 0,
  navigation = false,
  pagination = false,
  speed = 350,
  threshold = 5 ,
  resistanceRatio = 0.85,
  longSwipesRatio = 0.2,
  longSwipesMs = 200,  
  lazyPreloadPrevNext = 1,
  touchStartPreventDefault = false,
  className = "",
  ...props  
}) {
  return (    
    <Swiper      
      modules={[Navigation, Pagination]}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      speed={speed}
      navigation={navigation}
      pagination={pagination ? { clickable: true, dynamicBullets: true } : false}
      threshold={threshold}
      resistanceRatio={resistanceRatio}
      longSwipesRatio={longSwipesRatio}
      longSwipesMs={longSwipesMs}      
      lazyPreloadPrevNext={lazyPreloadPrevNext}
      touchStartPreventDefault={touchStartPreventDefault}      
      className={`custom-carousel w-full rounded-xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </Swiper>
  );
}