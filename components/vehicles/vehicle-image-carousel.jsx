"use client";

import Image from "next/image";
import Carousel from "../carousel";
import { SwiperSlide } from "swiper/react";
import FullscreenVehicleGallery from "./fullscreen-image";
import { useState } from "react";

export default function VehicleImageCarousel({ vehicle }) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images = vehicle?.vehicle_images || [];
  
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }
  return (
    <div className="flex aspect-video overflow-hidden h-full w-screen px-2 pt-2">
      <Carousel
        pagination
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <button
              className="relative w-full h-full"
              onClick={() => setFullscreenOpen(true)}
            >
              <Image
                src={image.url}
                alt={vehicle.model}
                className="object-cover"
                fill
                sizes="(max-width: 728px) 100vw, 320px"
                priority={image.order_index === 0}
              />
              {/* top gradient */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-b from-black/20 to-transparent" />

              {/* bottom gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-black/20 to-transparent" />
            </button>
          </SwiperSlide>
        ))}
      </Carousel>
      <FullscreenVehicleGallery
        images={images}
        initialSlide={activeIndex}
        open={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
      />
    </div>
  );
}
