import image1 from "@/public/images/AppleMountains.jpg";
import image2 from "@/public/images/Catalina.jpg";
import image3 from "@/public/images/mountains.jpg";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function SlideShow() {
  return (
    <div className="relative -top-20 slide-container w-full z-20">
      <Swiper
        spaceBetween={0}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        navigation={true}
        pagination={{
          clickable: true,
          type: "fraction",
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-screen">
            <Image
              src={image1.src}
              alt="slider image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-screen">
            <Image
              src={image2.src}
              alt="slider image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-screen">
            <Image
              src={image3.src}
              alt="slider image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
