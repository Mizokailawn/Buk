"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { X } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Keyboard, Zoom } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import "swiper/css/zoom";
import { Button } from "../ui/button";

export default function FullscreenVehicleGallery({
  images,
  initialSlide = 0,
  open,
  onClose,
}) {
  const [activeIndex, setActiveIndex] = useState(initialSlide);

  // lock body scroll
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-999
        bg-black
        opacity-100
        transition-opacity duration-300
      "
    >
      {/* top overlay */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4">
        {/* image counter */}
        <div className="rounded-full bg-background/50 px-3 py-1 text-sm text-foreground backdrop-blur-md">
          {activeIndex + 1} / {images.length}
        </div>

        {/* close button */}
        <Button
          onClick={onClose}
          className="
            rounded-full
            bg-background/50
            p-2
            text-foreground
            backdrop-blur-md
            transition-transform
            active:scale-95            
            h-6 w-6
          "
          variant="outline"
        >
          <X size={22} />
        </Button>
      </div>

      {/* swiper */}
      <Swiper
        modules={[Pagination, Keyboard, Zoom]}
        initialSlide={initialSlide}
        slidesPerView={1}
        speed={350}
        threshold={5}
        resistanceRatio={0.85}
        longSwipesRatio={0.2}
        longSwipesMs={200}
        zoom={{
          maxRatio: 3,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="custom-carousel h-screen w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id || index}>
            <div className="flex h-screen w-full items-center justify-center">
              <div className="relative swiper-zoom-container h-full w-full">
                <Image
                  src={image.url}
                  alt=""
                  fill
                  priority={index === initialSlide}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
