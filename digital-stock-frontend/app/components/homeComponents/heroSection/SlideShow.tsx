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
            <div className="relative w-full h-[70vh] md:h-[90vh] max-h-[800px]">
              <Image
                fill
                src={slider.image}
                alt="slider image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute bottom-0 w-full bg-white/40 backdrop-blur-sm px-4 py-6 flex flex-col gap-3 items-center text-center sm:hidden z-20">
              <span className="text-2xl font-bold leading-tight text-gray-900">
                {slider.titleUp} <br />
                {slider.titleDown}
              </span>
              <span className="text-sm italic text-gray-600">
                {slider.subtitle}
              </span>
              <div className="mt-3">
                <ShopCategoryButton
                  category={slider.category}
                  value={`Shop ${slider.category}`}
                />
              </div>
            </div>

            <div
              className={`absolute hidden sm:flex flex-col gap-3 sm:px-0 sm:py-0 transition-all z-20
    ${
      slider.rightText
        ? "sm:top-1/3 sm:right-12 items-end sm:items-end text-right"
        : "sm:top-1/3 sm:left-12 md:left-20 lg:left-40 items-start text-left"
    }`}
            >
              <div className="flex flex-col-reverse sm:flex-col items-center sm:items-start gap-2">
                <span className="bg-gray-600 text-gray-100 italic inline-block text-xs p-1 rounded-md order-2 sm:order-1">
                  {slider.subtitle}
                </span>
                <span
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-4 text-center order-1 sm:order-2 ${
                    slider.rightText ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  {slider.titleUp} <br />
                  {slider.titleDown}
                </span>
              </div>
              <span>
                <ShopCategoryButton
                  category={slider.category}
                  value={`Shop ${slider.category}`}
                />
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
