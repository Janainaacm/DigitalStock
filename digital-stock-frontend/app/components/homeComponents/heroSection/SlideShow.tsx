import image1 from "@/public/images/Apple-watch-home.jpg";
import image2 from "@/public/images/Macbook-home.jpg";
import image3 from "@/public/images/Earphones-home.jpg";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ShopCategoryButton from "../../buttons/ShopCategoryButton";

export default function SlideShow() {
  const sliders = [
    {
      id: 1,
      image: image3,
      subtitle:
        "Silence is golden, but with the right Earphones, every sound becomes priceless.",
      titleUp: "Discover The World With",
      titleDown: "Music",
      rightText: false,
      category: "Earphones",
    },
    {
      id: 3,
      image: image2,
      subtitle:
        "A computer is not just a tool; it's the canvas where innovation and imagination meet.",
      titleUp: "Experience Technology",
      titleDown: "Without Boundaries",
      rightText: true,
      category: "Computers",
    },
    {
      id: 2,
      image: image1,
      subtitle:
        "Time is the ultimate luxury, and a great watch makes every second count.",
      titleUp: "Your World",
      titleDown: "On Your Wrist",
      rightText: false,
      category: "Watches",
    },
  ];

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
        {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div className="relative w-full h-[90vh]">
              <Image
                layout="responsive"
                src={slider.image}
                alt="slider image"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className={
                slider.rightText
                  ? "absolute bg-white p-4 opacity-90 sm:bg-transparent sm:p-0 sm:opacity-100 bottom-10 right-1/2 transform translate-x-1/2 sm:transform-none sm:top-1/3 sm:right-12 md:right-20 lg:right-40 flex flex-col items-center sm:items-end"
                  : "absolute bg-white p-4 opacity-90 sm:bg-transparent sm:p-0 sm:opacity-100 bottom-10 right-1/2 transform translate-x-1/2 sm:transform-none sm:top-1/3 sm:left-12 md:left-20 lg:left-40 flex flex-col items-center sm:items-start"
              }
            >
              <span className="bg-gray-600 text-gray-100 italic inline-block text-base sm:text-xs p-1 rounded-md">
                {slider.subtitle}
              </span>
              <span
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-4 text-center ${
                  slider.rightText ? "sm:text-right" : "sm:text-left"
                }`}
              >
                {slider.titleUp} <br />
                {slider.titleDown}
              </span>
              <span className="">
                <ShopCategoryButton category={slider.category} value={`Shop ${slider.category}`} />
              </span>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
